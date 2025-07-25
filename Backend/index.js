const express = require("express");
const { PORT, Origin } = require("./config/env");
const db_connection = require("./config/db_connection");
const authRouter = require("./routers/auth.router");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();
const cookieParser = require("cookie-parser");
const carsRouter = require("./routers/cars.router");
const limiter = require("express-rate-limit");
const reviewRouter = require("./routers/review.router");
const profileRouter = require("./routers/profile.router");
const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: Origin,
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// app.use(
//   "/api",
//   limiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: {
//       success: false,
//       message: "Too many requests from this IP, please try again later.",
//     },
//   })
// );

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/cars", carsRouter);

app.use("/api/v1/user/reviews", reviewRouter);

app.use("/api/v1/user/profile", profileRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  await db_connection();
});
