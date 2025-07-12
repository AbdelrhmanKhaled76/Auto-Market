const { body } = require("express-validator");
const { default: parsePhoneNumberFromString } = require("libphonenumber-js");
const signupValidation = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ max: 15 })
    .withMessage("username must be less than 15 characters"),
  body("email").normalizeEmail().isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
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
  body("email").normalizeEmail().isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("password field can't be empty"),
];

module.exports = {
  signupValidation,
  signInValidation,
};
