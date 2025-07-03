const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    err = new Error("not authorized user");
    err.statusCode = 403;
    return next(err);
  }

  const token = auth.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      err = new Error("Unauthorized");
      err.statusCode = 403;
      return next(err);
    }
    req.user = data;
    return next();
  });
};

module.exports = {
  authMiddleware,
};
