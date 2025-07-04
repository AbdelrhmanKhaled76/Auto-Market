const { Router, json } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  addReview,
  editReview,
  deleteReview,
  getReview,
  getAllReviews,
} = require("../controllers/review.controller");
const {
  addReviewValidation,
  editReviewValidation,
  deleteReviewValidation,
  getReviewValidation,
} = require("../validations/review.validation");
const {
  ValidationMiddleware,
} = require("../middlewares/Validation.middleware");

const reviewRouter = Router();

// reviews
reviewRouter.post(
  "/addReview",
  json(),
  authMiddleware,
  addReviewValidation,
  ValidationMiddleware,
  addReview
);

reviewRouter.put(
  "/editReview/:reviewId",
  json(),
  authMiddleware,
  editReviewValidation,
  ValidationMiddleware,
  editReview
);

reviewRouter.delete(
  "/deleteReview/:reviewId",
  authMiddleware,
  deleteReviewValidation,
  ValidationMiddleware,
  deleteReview
);

reviewRouter.get(
  "/:reviewId",
  authMiddleware,
  getReviewValidation,
  ValidationMiddleware,
  getReview
);

reviewRouter.get("/", getAllReviews);

module.exports = reviewRouter;
