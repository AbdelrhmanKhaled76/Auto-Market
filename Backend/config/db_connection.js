const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const db_connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(`failed to connect to mongodb : ${err}`);
    process.exit(1);
  }
};

module.exports = db_connection;
