const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1900 },
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, min: 0 },
    transmission: { type: String, enum: ["automatic", "manual"] },
    bodyType: {
      type: String,
      enum: ["sedan", "suv", "truck", "coup", "convetible", "hatchback"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["gasoline", "diesel", "electric", "hybrid"],
      required: true,
    },
    condition: {
      type: String,
      enum: ["excellent", "good", "fair", "poor"],
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [{ url: String, publicId: String }],
    features: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    featured: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
