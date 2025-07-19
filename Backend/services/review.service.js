const reviewModel = require("../models/review.model");
const userModel = require("../models/user.model");

const addReviewService = async ({ description, rating }, user) => {
  const existingReview = await reviewModel.findOne({ madeBy: user.id });

  if (existingReview) {
    const err = new Error("review already exist");
    err.statusCode = 400;
    throw err;
  }

  const review = await reviewModel.create({
    description,
    rating,
    madeBy: user.id,
  });
  if (!review) {
    const err = new Error("something went wrong");
    throw err;
  }
  await userModel.findByIdAndUpdate(user.id, {
    $set: { review: review._id },
  });

  return review;
};

const editReviewService = async (
  { rating, description },
  { reviewId },
  user
) => {
  const previousReview = await reviewModel.findById(reviewId);

  if (!previousReview) {
    const err = new Error("review not found");
    err.statusCode = 404;
    throw err;
  }

  if (previousReview.madeBy.toString() !== user.id) {
    const err = new Error("forbidden");
    err.statusCode = 403;
    throw err;
  }

  if (
    previousReview.rating === rating &&
    previousReview.description === description
  ) {
    const err = new Error("nothing changed to edit");
    throw err;
  }

  const newReview = await reviewModel.findByIdAndUpdate(reviewId, {
    $set: {
      description,
      rating,
      updatedAt: new Date(),
    },
  });

  return newReview;
};

const deleteReviewService = async ({ reviewId }, user) => {
  const previousReview = await reviewModel.findById(reviewId);

  if (!previousReview) {
    const err = new Error("review not found");
    err.statusCode = 404;
    throw err;
  }

  if (previousReview.madeBy.toString() !== user.id) {
    const err = new Error("forbidden: You can only delete your own review");
    err.statusCode = 403;
    throw err;
  }

  await reviewModel.findByIdAndDelete(reviewId);
};

const getReviewService = async ({ reviewId }, user) => {
  const Review = await reviewModel.findById(reviewId);

  if (!Review) {
    const err = new Error("review not found");
    err.statusCode = 404;
    throw err;
  }

  if (Review.madeBy.toString() !== user.id) {
    const err = new Error("forbidden: You can only delete your own review");
    err.statusCode = 403;
    throw err;
  }

  return Review;
};

const getAllReviewsService = async () => {
  const reviews = await reviewModel.find().populate("madeBy").limit(3);
  return reviews;
};

module.exports = {
  addReviewService,
  editReviewService,
  deleteReviewService,
  getReviewService,
  getAllReviewsService,
};
