const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signUpService = async (data) => {
  const existingUser = await userModel.findOne({ email: data.email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const newUser = await userModel.create({
    username: data.username,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
    createdAt: new Date(),
  });

  return newUser;
};

const signInService = async ({ email, password }) => {
  const existingUser = await userModel
    .findOne({
      email,
    })
    .select("+password");

  // handling not found user
  if (!existingUser) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // comapring passwords
  const isPasswordRight = await bcrypt.compare(password, existingUser.password);

  if (isPasswordRight) {
    const payload = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };
    return payload;
  } else {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  signUpService,
  signInService,
};
