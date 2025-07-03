const { validationResult } = require("express-validator");

const ValidationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
    });
  }
  next();
};

module.exports = {
  ValidationMiddleware,
};
