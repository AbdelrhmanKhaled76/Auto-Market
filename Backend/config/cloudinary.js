const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET } = require("./env");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  secure: true,
  api_secret: CLOUD_SECRET,
});

module.exports = {
  cloudinary,
};

