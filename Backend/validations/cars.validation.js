const { body, param } = require("express-validator");

const carDetailsValidation = [
  param("id")
    .notEmpty()
    .withMessage("id parameter is required")
    .isMongoId()
    .withMessage("id must be a valid MongoDB ObjectId"),
];

const sellCarValidation = [
  body("make").notEmpty().withMessage("make field can't be empty"),
  body("model").notEmpty().withMessage("model field is required"),
  body("year")
    .notEmpty()
    .withMessage("year field is required")
    .isNumeric()
    .withMessage("year field must be a number")
    .toInt(),
  body("price")
    .notEmpty()
    .withMessage("price field is required")
    .isInt({ min: 1000 })
    .withMessage("price must be a number and at least 1000")
    .toInt(),
  body("mileage")
    .notEmpty()
    .withMessage("mileage field is required")
    .isInt({ min: 0 })
    .withMessage("mileage must be a number and cannot be negative")
    .toInt(),
  body("transmission")
    .notEmpty()
    .withMessage("transmission field is required")
    .isIn(["automatic", "manual"])
    .withMessage("transmission must be one of : automatic , manual"),
  body("bodyType")
    .notEmpty()
    .withMessage("bodyType field is required")
    .isIn(["sedan", "suv", "truck", "coup", "convetible", "hatchback"])
    .withMessage(
      "bodyType must be one of : sedan, suv, truck, coup, convetible, hatchback"
    ),
  body("fuelType")
    .notEmpty()
    .withMessage("fuelType field is required")
    .isIn(["gasoline", "diesel", "electric", "hybrid"])
    .withMessage(
      "fuelType must be one of : gasoline, diesel, electric, hybrid"
    ),
  body("condition")
    .notEmpty()
    .withMessage("condition field is required")
    .isIn(["excellent", "good", "fair", "poor"])
    .withMessage("condition must be one of : excellent, good, fair, poor"),
  body("features").notEmpty().withMessage("features field is required"),
  body("description").notEmpty().withMessage("description field is required"),
];

module.exports = {
  carDetailsValidation,
  sellCarValidation,
};
