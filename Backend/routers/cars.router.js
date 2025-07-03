const { Router, json } = require("express");
const {
  allCars,
  carDetail,
  featuredCars,
  recentCars,
  sellCar,
} = require("../controllers/cars.controller");
const upload = require("../config/multer");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  carDetailsValidation,
  sellCarValidation,
} = require("../validations/cars.validation");
const {
  ValidationMiddleware,
} = require("../middlewares/Validation.middleware");

const carsRouter = Router();

carsRouter.get("/featured", json(), featuredCars);

carsRouter.get("/recent", json(), recentCars);

carsRouter.get("/", json(), allCars);

carsRouter.get(
  "/:id",
  json(),
  carDetailsValidation,
  ValidationMiddleware,
  carDetail
);

carsRouter.post(
  "/sellCar",
  authMiddleware,
  upload.array("images", 4),
  sellCarValidation,
  ValidationMiddleware,
  sellCar
);

module.exports = carsRouter;
