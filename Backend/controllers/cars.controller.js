const {
  featuredCarsService,
  recentCarsService,
  allCarsService,
  carDetailService,
  sellCarService,
} = require("../services/cars.service");

const featuredCars = async (req, res, next) => {
  try {
    const cars = await featuredCarsService();
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
    const cars = await recentCarsService();
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
  const CarsNum = parseInt(req.query.carsNum) || 6; // default 10 per page

  try {
    const { carsCount, totalPages, cars } = await allCarsService({
      currentPage,
      CarsNum,
    });

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
    const car = await carDetailService({ id });
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
  try {
    const { body, files, user } = req;
    const car = await sellCarService(body, files, user);
    res.status(201).json({
      success: true,
      message: "Car is offered for selling successfully",
      data: {
        carInfo: car.toObject(),
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Duplicated car entry";
      error.statusCode = 409;
    }
    next(error);
  }
};

module.exports = {
  featuredCars,
  recentCars,
  allCars,
  carDetail,
  sellCar,
};
