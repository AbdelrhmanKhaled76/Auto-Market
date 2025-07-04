const { body } = require("express-validator");
const { default: parsePhoneNumberFromString } = require("libphonenumber-js");

const editProfileInfoValidation = [
  body("username")
    .notEmpty()
    .withMessage("username field is required")
    .trim()
    .escape()
    .isLength({ max: 20, min: 2 })
    .withMessage("username must be a valid name between 2 and 20 characters"),
  body("email")
    .notEmpty()
    .withMessage("email field is required")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail(),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number field is required")
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

const editProfilePasswordValidation = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];

module.exports = {
  editProfileInfoValidation,
  editProfilePasswordValidation,
};
