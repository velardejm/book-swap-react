const jwt = require("jsonwebtoken");

module.exports = function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    req.user = null;
    next();
  }

  jwt.verify(token, "SECRET", (err, user) => {
    if (err) {
      req.user = null;
      next();
    } else {
      req.user = user;
      next();
    }
  });
};
