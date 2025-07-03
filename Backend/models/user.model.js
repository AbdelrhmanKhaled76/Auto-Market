const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxlength: 20 , minlength : 2},
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false, minlength: 6 },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 15,
    },
    favouriteCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    selling: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
    buying: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    review: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true, unique : true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
