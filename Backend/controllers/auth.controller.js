const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_REFRESH,
  JWT_REFRESH_EXPIRE,
  NODE_ENV,
} = require("../config/env");

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      const error = new Error("user already exists");
      error.statusCode = 409;
      return next(error);
    }

    let newUsers = await userModel.create([
      {
        username,
        email,
        password,
        phoneNumber,
        createdAt: new Date(),
      },
    ]);

    // newUsers is an array (since you used .create with an array)

    res.status(201).json({
      message: "user is created successfully",
      success: true,
      data: {
        id: newUsers[0]._id,
        username: newUsers[0].username,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne(
      {
        email,
      },
      {
        email: 1,
        username: 1,
        password: 1,
      }
    );

    // handling not found user
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    // comapring passwords
    const isPasswordRight = await bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });

      const refreshToken = jwt.sign(payload, JWT_REFRESH, {
        expiresIn: JWT_REFRESH_EXPIRE,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        data: {
          userId: user.id,
          username: user.username,
        },
        accessToken: token,
      });
    }
    //handling wrong password
    else {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }
  } catch (err) {
    err.statusCode = 400;
    return next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "production",
  });
  return res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
};

const refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_REFRESH); // or same secret
    const user = await userModel.findById(decoded.id);
    if (!user) throw new Error("User not found");

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = {
  signUp,
  signIn,
  logout,
  refreshToken,
};
