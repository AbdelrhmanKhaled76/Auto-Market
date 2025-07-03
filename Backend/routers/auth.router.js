const { Router, json } = require("express");
const {
  signUp,
  signIn,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");
const {
  signupValidation,
  signInValidation,
} = require("../validations/auth.validation");
const {
  ValidationMiddleware,
} = require("../middlewares/Validation.middleware");
const authRouter = Router();

//sign up api
authRouter.post(
  "/signup",
  json(),
  signupValidation,
  ValidationMiddleware,
  signUp
);

// sign in api
authRouter.post(
  "/signin",
  json(),
  signInValidation,
  ValidationMiddleware,
  signIn
);

// logout api
authRouter.post("/logout", json(), logout);

//refreshToken api
authRouter.post("/refreshToken", json(), refreshToken);

module.exports = authRouter;
