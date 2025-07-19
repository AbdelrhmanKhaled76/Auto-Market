const { body } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

// Signup validation
const signupValidation = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isLength({ max: 15 })
    .withMessage("Username must be less than 15 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character"
    ),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .custom((value) => {
      const phone = value.startsWith("+")
        ? parsePhoneNumberFromString(value)
        : parsePhoneNumberFromString(value, "EG"); // fallback to Egypt as default

      if (!phone || !phone.isValid()) {
        throw new Error("Invalid phone number format");
      }

      return true;
    }),
];

// Sign in validation
const signInValidation = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),

  body("password").notEmpty().withMessage("Password cannot be empty"),
];

module.exports = {
  signupValidation,
  signInValidation,
};
