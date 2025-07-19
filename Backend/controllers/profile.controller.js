const {
  getProfileService,
  editProfileService,
  updatePasswordService,
} = require("../services/profile.service");

const getProfile = async (req, res, next) => {
  try {
    const userInfo = await getProfileService(req.user);

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
  try {
    const updatedUser = await editProfileService(req.body, req.user);
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
  try {
    await updatePasswordService(req.body, req.user);

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
