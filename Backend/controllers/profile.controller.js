const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const getProfile = async (req, res, next) => {
  try {
    const userInfo = await userModel.findById(req.user.id).select("-password");

    if (!userInfo) {
      const err = new Error("user not found");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({
      success: true,
      message: "user data retrieved successfully",
      data: userInfo,
    });
  } catch (err) {
    return next(err);
  }
};

const editProfileInfo = async (req, res, next) => {
  const { username, email, phoneNumber } = req.body;
  try {
    const userInfo = await userModel.findById(req.user.id).select("-password");

    if (!userInfo) {
      const err = new Error("user not found");
      err.statusCode = 404;
      return next(err);
    }

    if (
      userInfo.username === username &&
      userInfo.email === email &&
      userInfo.phoneNumber === phoneNumber
    ) {
      const err = new Error("nothing changed to update");
      err.statusCode = 403;
      return next(err);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, {
        $set: {
          email,
          password,
          phoneNumber,
          updatedAt: new Date(),
        },
      })
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "user info updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return next(err);
  }
};

const updatePassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const userInfo = await userModel.findById(req.user.id).select("password");

    if (!userInfo) {
      const err = new Error("user not found");
      err.statusCode = 404;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (isMatch) {
      const err = new Error("nothing changed to update");
      err.statusCode = 403;
      return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(req.user.id, {
      $set: {
        password: hashedNewPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "user password updated successfully",
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getProfile,
  editProfileInfo,
  updatePassword,
};
