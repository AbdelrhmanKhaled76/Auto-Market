const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
    price: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
