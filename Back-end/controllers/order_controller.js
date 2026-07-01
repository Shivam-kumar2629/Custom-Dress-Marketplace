const orderModel = require("../models//order_model");
const requestModel = require("../models/request_model");
const dressModel = require("../models/dress_model");

const customiseOrder = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const proposalId = req.params.proposalId;
    const buyerId = req.user._id;
    const request = await requestModel.findOne({
      _id: requestId,
      buyerId: buyerId,
    });
    if (!request) {
      return res.status(400).json({
        message: "request not found",
      });
    }
    const proposal = request.proposals.find(
      (proposal) => proposal._id.toString() === proposalId.toString(),
    );
    if (!proposal) {
      return res.status(400).json({
        message: "proposal not found",
      });
    }
    if (proposal.status !== "accepted") {
      return res.status(400).json({
        message: "proposal not accepted yet!",
      });
    }
    const { price, timeline, message } = proposal;
    const sellerId = proposal.sellerId;

    const existingOrder = await orderModel.findOne({
      requestId,
      proposalId,
      buyerId,
    });

    if (existingOrder) {
      return res.status(400).json({
        message: "order already exists for this proposal",
      });
    }

    const newOrder = await orderModel.create({
      buyerId,
      sellerId,
      requestId,
      proposalId,
      price,
      timeline,
      message,
      orderType: "customise",
      status: "pending",
    });

    request.proposals = request.proposals.filter(
      (proposal) => proposal._id.toString() !== proposalId,
    );

    await request.save();

    return res.status(201).json({
      message: "order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("error while creating cutomise  order:", error);
    return res.status(500).json({
      message: "server side error while creating  customise order",
    });
  }
};

const order = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const dressId = req.params.dressId;
    const dress = await dressModel.findById(dressId);
    if (!dress) {
      return res.status(400).json({
        message: "dress not found",
      });
    }
    const sellerId = dress.sellerId;
    const newOrder = await orderModel.create({
      price: dress.price,
      buyerId,
      sellerId,
      dressId,
      orderType: "normal",
      status: "pending",
    });
    return res.status(200).json({
      message: "order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("error while placing normal order : ", error);
    return res.status(500).json({
      message: "server side error while placing normal order",
    });
  }
};

const myOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const orders = await orderModel
      .find({
        buyerId,
      })
      .sort({ createdAt: -1 });

    for (let order of orders) {
      if (order.orderType !== "normal") {
        continue;
      }

      const dress = await dressModel.findById(order.dressId);

      if (!dress) {
        await orderModel.findByIdAndDelete(order._id);
      }
    }
    const updatedOrders = await orderModel
      .find({ buyerId })
      .sort({ createdAt: -1 });

    if (updatedOrders.length === 0) {
      return res
        .status(200)
        .json({ message: "no orders yet", orders: updatedOrders });
    }

    return res.status(200).json({
      message: "order fetched successfully",
      orders: updatedOrders,
    });
  } catch (error) {
    console.log("error while getting orders :", error);
    return res.status(500).json({
      message: "server side error while fetching order",
    });
  }
};

const sellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const orders = await orderModel
      .find({ sellerId: sellerId })
      .sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).json({
        message: "no orders found",
        orders: [],
      });
    }
    return res.status(200).json({
      message: "order fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("error while fetching orders by seller:", error);
    return res.status(500).json({
      message: "server side error while fetching orders by seller",
    });
  }
};

const orderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const status = req.body.status;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(400).json({
        message: "order not found",
      });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
      message: "order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("error while setting status of order :", error);
    return res.status(500).json({
      message: "server side error while setting status of order",
    });
  }
};

module.exports = { customiseOrder, order, myOrders, sellerOrders, orderStatus };
