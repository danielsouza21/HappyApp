const orphanages = require("./database/fakedata.js");

module.exports = {
  index(request, response) {
    const query = request.query;
    var city = query.city ? query.city : "Belo Horizonte";
    //Query -> Request HTTP quando dado GET - Dados especificos

    return response.render("index", { city });
  },

  orphanages(req, res) {
    return res.render("orphanages", { orphanages });
  },

  sgl_orphanage(req, res) {
    return res.render("sgl-orphanage");
  },

  create_orphanage(req, res) {
    return res.render("create-orphanage");
  },
};
