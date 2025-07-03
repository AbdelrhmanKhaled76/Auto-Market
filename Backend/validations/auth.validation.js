const { body } = require("express-validator");
const { default: parsePhoneNumberFromString } = require("libphonenumber-js");
const signupValidation = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name field is required"),
  body("email").normalizeEmail().isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .custom((value) => {
      const phone = value.startsWith("+")
        ? parsePhoneNumberFromString(value) // full international
        : parsePhoneNumberFromString(value, "EG"); // local format fallback

      if (!phone || !phone.isValid()) {
        throw new Error("Invalid phone number format");
      }

      return true;
    }),
];

const signInValidation = [
  body("email").notEmpty().withMessage("email field can't be empty"),
  body("password").notEmpty().withMessage("password field can't be empty"),
];

module.exports = {
  signupValidation,
  signInValidation,
};
