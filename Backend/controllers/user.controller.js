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
  
};

module.exports = {
  addReview,
};
