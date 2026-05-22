const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    dressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dressModel",
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "requestModel",
    },
    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    price: {
      type: Number,
    },
    timeline: {
      type: String,
    },
    message: {
      type: String,
    },
    orderType: {
      type: String,
      enum: ["normal", "customise"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;
