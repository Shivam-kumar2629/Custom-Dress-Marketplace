const mongoose = require("mongoose");
const schema = mongoose.Schema;

const requestSchema = new schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    proposals: [
      {
        sellerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel",
          required: true,
        },
        price: Number,
        timeline: String,
        message: String,
        status: {
          type: String,
          enum: ["accepted", "rejected", "pending"],
          default: "pending"
        },
      },
    ],
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
  },
  { timestamps: true },
);

const requestModel = mongoose.model("requestModel", requestSchema);

module.exports = requestModel;
