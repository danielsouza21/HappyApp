const apiAuth = require("./AuthApi");

const jwt = require("jsonwebtoken");

module.exports = {
  async registerUser(firstName, lastName, username, password) {
    const response = await apiAuth.post("users/register", {
      firstName,
      lastName,
      username,
      password,
    });
  },

  async loginUser(req, res) {
    var body = req.body;
    var user = { username: body.username, password: body.password };

    var response = await apiAuth
      .post("users/authenticate", user)
      .then((response) => sucessAutentication(req, response, res, user))
      //sucessAutentication -> save token from response to cookies
      .then((response) => res.redirect("/orphanages"))
      .catch((error) => {
        console.log(`Status error ${error.response.status}`);
        res.redirect("/login");
      });
  },

  async AuthenticatorResponse(req, res) {
    var token = req.session.token;
    var response = "";
    var authorized;

    var header = { headers: { Authorization: `Bearer ${token}` } };
    // console.log(header);
    var response = await apiAuth
      .get("users", header)
      .then((response) => {
        console.log("User Authorized");
        authorized = "Authorized";
      })
      .catch((error) => {
        console.log("User Unauthorized");
        authorized = "Unauthorized";
      });

    if (authorized == "Authorized") {
      return true;
    } else {
      return false;
    }
  },
};

function sucessAutentication(req, response, res, user) {
  var tokenjwt = response.data.token; //get token response
  saveUserCookie(req, res, tokenjwt, user);
}

saveUserCookie = async (req, res, token, user) => {
  req.session.token = token;
  req.session.username = user.username;
  req.session.password = user.password;
};
