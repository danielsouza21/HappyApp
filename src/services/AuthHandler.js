const api = require("./AuthApi");

const jwt = require("jsonwebtoken");

module.exports = {
  async registerUser(firstName, lastName, username, password) {
    const response = await api.post("users/register", {
      firstName,
      lastName,
      username,
      password,
    });
  },

  async loginUser(req, res) {
    var body = req.body;
    var username = body.username;
    var password = body.password;

    const response = await api
      .post("users/authenticate", {
        username,
        password,
      })
      .then((response) => res.redirect("/orphanages"))
      .catch((error) => {
        console.log("Error");
        res.redirect("/");
      });
  },
};

saveToken = async (req, res, next) => {
  var expiration = 600;

  token = req.headers.authorization;

  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if your using https
    httpOnly: true,
  });
};

verifyToken = async (req, res, next) => {
  //api.defaults.headers.authorization = `Bearer ${token}`;

  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
      firstname: decrypt.firstname,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
