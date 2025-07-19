const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const {
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_REFRESH,
  JWT_REFRESH_EXPIRE,
  NODE_ENV,
} = require("../config/env");
const { signUpService, signInService } = require("../services/auth.service");

const signUp = async (req, res, next) => {
  const data = req.body;
  try {
    const newUser = await signUpService(data);

    res.status(201).json({
      message: "user is created successfully",
      success: true,
      data: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  const data = req.body;

  try {
    const payload = await signInService(data);

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
        userId: payload.id,
        username: payload.username,
      },
      accessToken: token,
    });

    // handling wrong password
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
      { id: user._id, email: user.email, username: user.username },
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
