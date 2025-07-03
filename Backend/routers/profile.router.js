const { Router } = require("express");
const { getProfile } = require("../controllers/profile.controller");

const profileRouter = Router();

profileRouter.get("", json(), authMiddleware, getProfile);

profileRouter.patch("/info", json(), authMiddleware, (req, res) => {
  res.send("hello world");
});

profileRouter.patch("/changePassword", json(), authMiddleware, (req, res) => {
  res.send("hello world");
});
