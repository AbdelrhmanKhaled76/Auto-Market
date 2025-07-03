const { Router, json } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { addReview } = require("../controllers/user.controller");

const userRouter = Router();

// reviews
userRouter.post("/reviews/addReview", json(), authMiddleware, addReview);

userRouter.put(
  "/reviews/editReview/:id",
  json(),
  authMiddleware,
  (req, res) => {
    res.send("hello world");
  }
);

userRouter.delete("/reviews/deleteReview/:reviewId", authMiddleware, (req, res) => {
  res.send("hello world");
});

userRouter.get("/reviews/:reviewId", json(), authMiddleware, (req, res) => {
  res.send("hello world");
});

userRouter.get("/reviews", json(), (req, res) => {
  res.send("hello world");
});

// profile
userRouter.get("/profile", json(), authMiddleware, (req, res) => {
  res.send("hello world");
});

userRouter.put("/profile", json(), authMiddleware, (req, res) => {
  res.send("hello world");
});

module.exports = userRouter;
