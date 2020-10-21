const { query } = require("express");
const DatabaseSQL = require("./database/db"); //exports Database.open() [promise -> assincrono]
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  index(request, response) {
    const query = request.query;
    var city = query.city ? query.city : "Belo Horizonte";
    //Query -> Request HTTP quando dado GET - Dados especificos

    return response.render("index", { city });
  },

  async orphanages(req, res) {
    try {
      const db = await DatabaseSQL; //aguarda Database.open()
      const orphanages = await db.all(`SELECT * FROM orphanages`); //recebe um array de orfanatos
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send.error("Erro SQL");
    }
  },

  async sgl_orphanage(req, res) {
    const ID = req.query.id; //recupera info da requisição HTTP ?id=?
    try {
      const db = await DatabaseSQL; //aguarda Database.open()
      const consultadb = await db.all(
        `SELECT * FROM orphanages WHERE id = "${ID}"` //acessa unico orfanato
      ); //recebe um array

      var orphanage = consultadb[0]; //transforma array em elemento
      orphanage.images = orphanage.images.split(",");
      orphanage.firstimage = orphanage.images[0];

      orphanage.open_on_weekends == "0"
        ? (orphanage.open_on_weekends = false)
        : (orphanage.open_on_weekends = true);

      return res.render("sgl-orphanage", { orphanage: orphanage });
    } catch (error) {
      console.log(error);
      return res.send.error("Erro SQL");
    }
  },

  create_orphanage(req, res) {
    return res.render("create-orphanage");
  },

  saveOrphanages(req, res) {
    let Query = req.body;
    add_to_database(Query);
    return res.redirect("/create-orphanage");
  },

  async delete_db(req, res) {
    const db = await DatabaseSQL;
    await db.run(`DELETE FROM orphanages`); //delete all database
    console.log("deleted database");
    return res.render("create-orphanage");
  },
};

async function add_to_database(Query) {
  var orphanage_toSave = {
    lat: `${Query.lat}`,
    lng: `${Query.lng}`,
    name: `${Query.name}`,
    about: `${Query.about}`,
    whatsapp: `${Query.whatsapp}`,
    images: `${Query.images.toString()}`,
    instructions: `${Query.instructions}`,
    opening_hours: `${Query.opening_hours}`,
    open_on_weekends: `${Query.open_on_weekends}`,
  };

  const db = await DatabaseSQL;
  await saveOrphanage(db, orphanage_toSave);

  //var database_cons = await db.all(`SELECT * FROM orphanages`);
  //console.log(database_cons);
}
