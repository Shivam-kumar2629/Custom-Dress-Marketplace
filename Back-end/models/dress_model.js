const mongoose = require("mongoose");
const schema = mongoose.Schema;

const dressSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  { timestamps: true },
);

const dressModel = mongoose.model("dressModel", dressSchema);
module.exports = dressModel;
