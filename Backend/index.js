const express = require("express");
const { PORT } = require("./config/env");
const db_connection = require("./config/db_connection");
const authRouter = require("./routers/auth.router");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();
const cookieParser = require("cookie-parser");
const carsRouter = require("./routers/cars.router");
const userRouter = require("./routers/user.router");

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/cars", carsRouter);

app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  await db_connection();
});
