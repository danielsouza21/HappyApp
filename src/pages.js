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
      const orphanage = await db.all(
        `SELECT * FROM orphanages WHERE id = "${ID}"` //acessa unico orfanato
      ); //recebe um array
      return res.render("sgl-orphanage", { orphanage: orphanage[0] });
    } catch (error) {
      console.log(error);
      return res.send.error("Erro SQL");
    }
  },

  create_orphanage(req, res) {
    return res.render("create-orphanage");
  },
};
