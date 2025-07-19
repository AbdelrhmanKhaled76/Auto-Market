const {
  addReviewService,
  editReviewService,
  deleteReviewService,
  getReviewService,
  getAllReviewsService,
} = require("../services/review.service");

const addReview = async (req, res, next) => {
  try {
    const review = await addReviewService(req.body, req.user);

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
  try {
    const newReview = await editReviewService(req.body, req.params, req.user);

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
  try {
    await deleteReviewService(req.params, req.user);

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
    const review = await getReviewService(req.params, req.user);

    return res.status(200).json({
      success: true,
      message: "review is retrieved successfully",
      data: review,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await getAllReviewsService();

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
