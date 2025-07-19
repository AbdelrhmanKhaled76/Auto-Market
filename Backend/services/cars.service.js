const userModel = require("../models/user.model");
const carModel = require("../models/car.model");
const uploadToCloudinary = require("../shared/functions/uploadToCloudinary");

const featuredCarsService = async () => {
  const cars = await carModel
    .find({
      featured: true,
    })
    .limit(3);
  if (!cars) {
    const err = new Error("no featured cars available");
    throw err;
  }
  return cars;
};

const recentCarsService = async () => {
  const cars = await carModel
    .find()
    .sort({
      createdAt: -1,
    })
    .limit(6);
  if (!cars) {
    const err = new Error("no featured cars available");
    throw err;
  }
  return cars;
};

const allCarsService = async ({ currentPage, CarsNum }) => {
  const carsCount = await carModel.countDocuments();

  const totalPages = Math.ceil(carsCount / CarsNum);

  if (currentPage > totalPages) {
    const err = new Error("No cars available on this page");
    err.statusCode = 404;
    throw err;
  }

  const skip = (currentPage - 1) * CarsNum;

  const cars = await carModel
    .find()
    .sort({ createdAt: -1 }) // Optional: newest first
    .skip(skip)
    .limit(CarsNum);

  return {
    cars,
    carsCount,
    totalPages,
  };
};

const carDetailService = async ({ id }) => {
  const car = await carModel.findById(id);
  if (!car) {
    const err = new Error("car not found");
    err.statusCode = 404;
    throw err;
  }
  return car;
};

const sellCarService = async (carData, files, user) => {
  if (!files || files.length === 0) {
    const err = new Error("No files uploaded");
    err.statusCode = 400;
    throw err;
  }

  const uploadResults = await Promise.all(
    files.map((file) => uploadToCloudinary(file.buffer))
  );

  if (uploadResults.some((res) => !res.secure_url || !res.public_id)) {
    const err = new Error("One or more images failed to upload");
    err.statusCode = 500;
    throw err;
  }

  const images = uploadResults.map((result) => ({
    url: result.secure_url,
    publicId: result.public_id,
  }));

  const existingUser = await userModel.findById(user.id).select("-password");
  if (!existingUser) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const car = await carModel.create({
    ...carData,
    images,
    seller: user.id,
  });

  await userModel.findByIdAndUpdate(user.id, {
    $push: { selling: car._id },
  });

  return car;
};

module.exports = { sellCarService };

module.exports = {
  featuredCarsService,
  recentCarsService,
  allCarsService,
  carDetailService,
  sellCarService,
};
