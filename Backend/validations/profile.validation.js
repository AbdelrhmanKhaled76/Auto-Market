const { body } = require("express-validator");

const editProfileInfo = [
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

const editProfilePassword = [
  body("password").notEmpty().withMessage("password field is required"),
];

module.exports = {
  editProfileInfo,
  editProfilePassword,
};
