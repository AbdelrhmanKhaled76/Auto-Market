const { body, param } = require("express-validator");

const addReviewValidation = [
  body("rating")
    .notEmpty()
    .withMessage("rating field is required")
    .isInt({ max: 5, min: 1 })
    .withMessage("rating must be a number between 1 and 5")
    .toInt(),
  body("description")
    .notEmpty()
    .withMessage("description field is required")
    .isString()
    .isLength({ min: 10, max: 300 })
    .withMessage("description must be between 10 and 300 characters long"),
];

const editReviewValidation = [
  body("rating")
    .notEmpty()
    .withMessage("rating field is required")
    .isInt({ max: 5, min: 1 })
    .withMessage("rating must be a number between 1 and 5")
    .toInt(),
  body("description")
    .notEmpty()
    .withMessage("description field is required")
    .isString()
    .isLength({ min: 10, max: 300 })
    .trim()
    .escape()
    .withMessage("description must be between 10 and 300 characters long"),
  param("reviewId")
    .notEmpty()
    .withMessage("review id is a required route parameter")
    .isMongoId()
    .withMessage("review id is not valid"),
];

const deleteReviewValidation = [
  param("reviewId")
    .notEmpty()
    .withMessage("review id is a required route parameter")
    .isMongoId()
    .withMessage("review id is invalid"),
];

const getReviewValidation = [
  param("reviewId")
    .notEmpty()
    .withMessage("review id is a required route parameter")
    .isMongoId()
    .withMessage("review id is invalid"),
];

module.exports = {
  addReviewValidation,
  editReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
};
