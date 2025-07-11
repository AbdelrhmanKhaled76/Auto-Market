const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_REFRESH,
  JWT_EXPIRE,
  JWT_REFRESH_EXPIRE,
  CLOUD_SECRET,
  CLOUD_API_KEY,
  CLOUD_NAME,
  Origin,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  JWT_REFRESH,
  JWT_REFRESH_EXPIRE,
  CLOUD_API_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
  Origin,
};
