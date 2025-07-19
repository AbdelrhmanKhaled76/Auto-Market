const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const getProfileService = async (user) => {
  const userInfo = await userModel.findById(user.id).select("-password");

  if (!userInfo) {
    const err = new Error("user not found");
    err.statusCode = 404;
    throw err;
  }

  return userInfo;
};

const editProfileService = async ({ username, email, phoneNumber }, user) => {
  const userInfo = await userModel.findById(user.id).select("-password");
  if (!userInfo) {
    const err = new Error("user not found");
    err.statusCode = 404;
    throw err;
  }
  if (
    userInfo.username === username &&
    userInfo.email === email &&
    userInfo.phoneNumber === phoneNumber
  ) {
    const err = new Error("nothing changed to update");
    err.statusCode = 403;
    throw err;
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(
      user.id,
      {
        $set: {
          email,
          username,
          phoneNumber,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    )
    .select("-password");

  return updatedUser;
};

const updatePasswordService = async ({ password }, user) => {
  const userInfo = await userModel.findById(user.id).select("password");

  if (!userInfo) {
    const err = new Error("user not found");
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, userInfo.password);

  if (isMatch) {
    const err = new Error("nothing changed to update");
    err.statusCode = 403;
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(password, salt);

  await userModel.findByIdAndUpdate(user.id, {
    $set: {
      password: hashedNewPassword,
    },
  });
};

module.exports = {
  getProfileService,
  editProfileService,
  updatePasswordService,
};
