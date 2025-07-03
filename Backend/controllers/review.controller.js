const reviewModel = require("../models/review.model");
const userModel = require("../models/user.model");

const addReview = async (req, res, next) => {
  const { rating, description } = req.body;
  try {
    const existingReview = await reviewModel.findOne({ madeBy: req.user.id });

    if (existingReview) {
      const err = new Error("review already exist");
      err.statusCode = 400;
      return next(err);
    }
    const review = await reviewModel.create({
      description,
      rating,
      madeBy: req.user.id,
    });
    if (!review) {
      const err = new Error("something went wrong");
      return next(err);
    }
    await userModel.findByIdAndUpdate(req.user.id, {
      $set: { review: review._id },
    });
    res.status(200).json({
      message: "review is created successfully",
      success: true,
      data: review.toObject(),
    });
  } catch (err) {
    if (err.code === 11000) {
      err.statusCode = 409;
      err.message = "Duplicate review submission detected.";
    }
    return next(err);
  }
};

const editReview = async (req, res, next) => {
  const { rating, description } = req.body;
  const { reviewId } = req.params;
  try {
    const previousReview = await reviewModel.findById(reviewId);

    if (!previousReview) {
      const err = new Error("review not found");
      err.statusCode = 404;
      return next(err);
    }

    if (previousReview.madeBy.toString() !== req.user.id) {
      const err = new Error("forbidden");
      err.statusCode = 403;
      return next(err);
    }

    if (
      previousReview.rating === rating &&
      previousReview.description === description
    ) {
      const err = new Error("nothing changed to edit");
      return next(err);
    }

    const newReview = await reviewModel.findByIdAndUpdate(reviewId, {
      $set: {
        description,
        rating,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "review updated successfully",
      data: newReview,
    });
  } catch (error) {
    return next(err);
  }
};

const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const previousReview = await reviewModel.findById(reviewId);

    if (!previousReview) {
      const err = new Error("review not found");
      err.statusCode = 404;
      return next(err);
    }

    if (previousReview.madeBy.toString() !== req.user.id) {
      const err = new Error("forbidden: You can only delete your own review");
      err.statusCode = 403;
      return next(err);
    }

    await reviewModel.findByIdAndDelete(reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

const getReview = async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const Review = await reviewModel.findById(reviewId);

    if (!previousReview) {
      const err = new Error("review not found");
      err.statusCode = 404;
      return next(err);
    }

    if (previousReview.madeBy.toString() !== req.user.id) {
      const err = new Error("forbidden: You can only delete your own review");
      err.statusCode = 403;
      return next(err);
    }

    return res.status(200).json({
      success: true,
      message: "review is retrieved successfully",
      data: Review,
    });
  } catch (error) {
    return next(err);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel.find();

    return res.status(200).json({
      message: "reviews are retrieved successfully",
      success: true,
      data: reviews,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addReview,
  editReview,
  deleteReview,
  getReview,
  getAllReviews,
};
