const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      required: true,
    },
    profileInfo: {
      type: Object,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const user = mongoose.model("user", userSchema);

module.exports = user;
