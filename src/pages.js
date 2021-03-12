const { query } = require("express");
const { reset } = require("nodemon");
const DatabaseSQL = require("./database/db"); //exports Database.open() [promise -> assincrono]
const DatabaseCardsSQL = require("./database/dbCards");
const saveOrphanage = require("./database/saveOrphanage");
const saveCardsDb = require("./database/saveCards");
const authHandler = require("./services/AuthHandler");

module.exports = {
  index(request, response) {
    request.session.token = "";
    const query = request.query;
    var city = query.city ? query.city : "Belo Horizonte";
    //Query -> Request HTTP quando dado GET - Dados especificos

    return response.render("index", { city });
  },

  async orphanages(req, res) {
    var authorized = await authHandler.AuthenticatorResponse(req, res);
    if (authorized == true) {
      try {
        const db = await DatabaseSQL; //aguarda Database.open()
        const orphanages = await db.all(`SELECT * FROM orphanages`); //recebe um array de orfanatos
        //console.log(req.session.token);
        return res.render("orphanages", {
          orphanages: orphanages,
          user: {
            username: req.session.username,
            firstName: req.session.firstName,
          },
        });
      } catch (error) {
        console.log(error);
        return res.send.error("Erro SQL");
      }
    } else {
      res.redirect("/login");
    }
  },

  async sgl_orphanage(req, res) {
    var authorized = await authHandler.AuthenticatorResponse(req, res);
    if (authorized == true) {
      const ID = req.query.id; //recupera info da requisição HTTP ?id=?
      var username_user = req.session.username;
      var firstName_user = req.session.firstName;

      try {
        const db = await DatabaseSQL; //aguarda Database.open()
        const consultadb = await db.all(
          `SELECT * FROM orphanages WHERE id = "${ID}"` //acessa unico orfanato
        ); //recebe um array

        const dbCards = await DatabaseCardsSQL;
        const consultCards = await dbCards.all(
          `SELECT * FROM cards WHERE id_page = "${ID}" `
        );

        var cardsData = consultCards[0];
        if (cardsData) var cardsRecovery = cardsData.cards.split(",");

        var orphanage = consultadb[0]; //transforma array em elemento
        orphanage.images = orphanage.images.split(",");
        orphanage.firstimage = orphanage.images[0];

        var verifyOwner = username_user == orphanage.owner ? true : false;

        orphanage.open_on_weekends == "0"
          ? (orphanage.open_on_weekends = false)
          : (orphanage.open_on_weekends = true);

        return res.render("sgl-orphanage", {
          cardsRecovery: cardsRecovery,
          orphanage: orphanage,
          user: {
            fistName: firstName_user,
            username: username_user,
            owner: verifyOwner,
          },
        });
      } catch (error) {
        console.log(error);
        return res.send.error("Erro SQL");
      }
    } else {
      res.redirect("/login");
    }
  },

  async login(req, res) {
    req.session.token = "";
    return res.render("login", {});
  },

  async register(req, res) {
    req.session.token = "";
    return res.render("register", {});
  },

  async create_orphanage(req, res) {
    var authorized = await authHandler.AuthenticatorResponse(req, res);
    if (authorized == true && req.session.username != null) {
      return res.render("create-orphanage");
    }
  },

  saveOrphanages(req, res) {
    var user = req.session.username;

    let Query = req.body;
    add_to_database(Query, user);
    return res.redirect("/orphanages");
  },

  saveCards(req, res) {
    if (req.body.testowner == "true") {
      let Query = req.body;
      let Cards = Query.cardssgl.toString().split(",");
      let id = req.body.idPage;
      id = id.toString().replace(/\D/g, "");

      add_to_cardsDb(Cards, id);
    }
    res.redirect("/orphanages");
  },

  async delete_db(req, res) {
    const db = await DatabaseSQL;
    await db.run(`DELETE FROM orphanages`); //delete all database
    console.log("deleted database");
    return res.render("create-orphanage");
  },
};

async function add_to_database(Query, user) {
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
    owner: `${user}`,
  };

  const db = await DatabaseSQL;
  await saveOrphanage(db, orphanage_toSave);

  //var database_cons = await db.all(`SELECT * FROM orphanages`);
  //console.log(database_cons);
}

async function add_to_cardsDb(cards, page_id) {
  var cards_toSave = {
    cards: `${cards.toString()}`,
    id_page: `${parseInt(page_id)}`,
  };

  const dbCards = await DatabaseCardsSQL;
  await saveCardsDb(dbCards, cards_toSave);
}
