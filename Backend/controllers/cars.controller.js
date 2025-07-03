const carModel = require("../models/car.model");
const userModel = require("../models/user.model");
const uploadToCloudinary = require("../shared/functions/uploadToCloudinary");

const featuredCars = async (req, res, next) => {
  try {
    const cars = await carModel
      .find({
        featured: true,
      })
      .limit(3);
    if (!cars) {
      const err = new Error("no featured cars available");
      return next(err);
    }
    res.json({
      success: true,
      message: "featured cars are sent successfully",
      data: cars,
    });
  } catch (err) {
    return next(err);
  }
};

const recentCars = async (req, res, next) => {
  try {
    const cars = await carModel
      .find()
      .sort({
        createdAt: -1,
      })
      .limit(6);
    if (!cars) {
      const err = new Error("no featured cars available");
      return next(err);
    }
    res.json({
      success: true,
      message: "recent cars are sent successfully",
      data: cars,
    });
  } catch (err) {
    return next(err);
  }
};

const allCars = async (req, res, next) => {
  const currentPage = parseInt(req.query.currentPage) || 1;
  const CarsNum = parseInt(req.query.CarsNum) || 10; // default 10 per page

  try {
    const carsCount = await carModel.countDocuments();

    const totalPages = Math.ceil(carsCount / CarsNum);

    if (currentPage > totalPages) {
      const err = new Error("No cars available on this page");
      err.statusCode = 404;
      return next(err);
    }

    const skip = (currentPage - 1) * CarsNum;

    const cars = await carModel
      .find()
      .sort({ createdAt: -1 }) // Optional: newest first
      .skip(skip)
      .limit(CarsNum);

    res.json({
      success: true,
      totalCars: carsCount,
      totalPages,
      currentPage,
      perPage: CarsNum,
      message: "Cars fetched successfully",
      data: cars,
    });
  } catch (err) {
    return next(err);
  }
};

const carDetail = async (req, res, next) => {
  const id = req.params.id;
  try {
    const car = await carModel.findById(id);
    if (!car) {
      const err = new Error("car not found");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      message: "car details is sent successfully",
      success: true,
      data: car,
    });
  } catch (err) {
    return next(err);
  }
};

const sellCar = async (req, res, next) => {
  const {
    make,
    model,
    year,
    price,
    mileage,
    condition,
    transmission,
    fuelType,
    bodyType,
    features,
    description,
  } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Upload all files to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );
    if (uploadResults.some((res) => !res.secure_url || !res.public_id)) {
      const err = new Error("One or more images failed to upload");
      err.statusCode = 500;
      return next(err);
    }

    // You can now store these in your database
    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

    const decoded = req.user;
    
    if (!decoded || !decoded.id) {
      const err = new Error("User not authorized");
      err.statusCode = 403;
      return next(err);
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      const err = new Error("user not found");
      err.statusCode = 404;
      return next(err);
    }

    const car = await carModel.create({
      bodyType,
      condition,
      description,
      features,
      fuelType,
      images,
      seller: decoded.id,
      make,
      mileage,
      model,
      price,
      transmission,
      year,
    });

    await userModel.findByIdAndUpdate(decoded.id, {
      $push: { selling: car._id },
    });

    res.status(201).json({
      success: true,
      message: "car is offered for selling successfully",
      data: {
        carInfo: car.toObject(),
      },
    });
  } catch (error) {
    if (error.statusCode === 11000) {
      error.message = "duplicated cars";
    }
    return next(error);
  }
};

module.exports = {
  featuredCars,
  recentCars,
  allCars,
  carDetail,
  sellCar,
};
