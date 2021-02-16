const apiAuth = require("./AuthApi");

const jwt = require("jsonwebtoken");

module.exports = {
  async registerUser(req, res) {
    var body = req.body;
    var user = {
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: "UFMG",
    };

    const response = await apiAuth
      .post("users/register", user)
      .then((response) => {
        console.log("Registered");
        res.redirect("/login");
      })
      .catch((error) => {
        console.log(
          `Status error ${error.response.status} Message ${error.message}`
        );

        console.log(`${JSON.stringify(error.response.data)}`);
        res.redirect("/register");
      });
  },

  async loginUser(req, res) {
    var body = req.body;
    var user = { username: body.username, password: body.password };

    var response = await apiAuth
      .post("users/authenticate", user)
      .then((responseapi) => sucessAutentication(req, responseapi, res))
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

function sucessAutentication(req, responseapi, res) {
  var tokenjwt = responseapi.data.token; //get token response

  var user = {
    firstName: responseapi.data.firstName,
    username: responseapi.data.username,
  };

  saveUserCookie(req, res, tokenjwt, user);
}

saveUserCookie = async (req, res, token, user) => {
  req.session.token = token;
  req.session.username = user.username;
  req.session.firstName = user.firstName;
};
