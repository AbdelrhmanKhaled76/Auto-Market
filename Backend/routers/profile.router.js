const { Router, json } = require("express");
const {
  getProfile,
  updatePassword,
  editProfileInfo,
} = require("../controllers/profile.controller");
const {
  editProfileInfoValidation,
  editProfilePasswordValidation,
} = require("../validations/profile.validation");
const {
  ValidationMiddleware,
} = require("../middlewares/Validation.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");

const profileRouter = Router();

profileRouter.get("", authMiddleware, getProfile);

profileRouter.patch(
  "/info",
  json(),
  authMiddleware,
  editProfileInfoValidation,
  ValidationMiddleware,
  editProfileInfo
);

profileRouter.patch(
  "/changePassword",
  json(),
  authMiddleware,
  editProfilePasswordValidation,
  ValidationMiddleware,
  updatePassword
);

module.exports = profileRouter;
