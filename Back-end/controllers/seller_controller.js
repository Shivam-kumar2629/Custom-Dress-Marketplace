const dressModel = require("../models/dress_model");
const requestModel = require("../models/request_model");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const add_dress = async (req, res) => {
  const { title, price, description, category } = req.body;
  const User = req.user;
  if (!User) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const sellerId = User._id;

  if (!title || !price || !category || !req.files || req.files.length === 0) {
    return res.status(400).json({ message: "fields must have valid inputs" });
  }
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
    }

    const dress = await dressModel.create({
      title,
      price,
      description,
      category,
      images: imageUrls,
      sellerId,
    });
    res.status(201).json({
      message: "dress created successfully",
      dress,
    });
    
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    console.log("add_dress error:", error);
    return res.status(500).json({ message: "server side error" });
  }
};

const get_dresses = async (req, res) => {
  const dresses = await dressModel.find();
  if (dresses.length === 0) {
    return res.status(200).json({ message: "no dress listed", dressess: [] });
  }
  res.status(200).json({
    message: "successfully get all dressess",
    dresses,
  });
};

const get_single_dress = async (req, res) => {
  try {
    const id = req.params.id;
    const dress = await dressModel.findById(id);
    if (!dress) {
      return res.status(404).json({ message: "dress not found" });
    }
    res.status(200).json({
      message: "single dress get successfully",
      dress,
    });
  } catch (error) {
    console.log("error in get-single-dress controller : ", error);
    return res.status(500).json({ message: "server side error" });
  }
};

const getMyDress = async (req, res) => {
  const sellerId = req.user._id;
  const dresess = await dressModel.find({
    sellerId: sellerId,
  });
  if (dresess.length === 0) {
    return res
      .status(404)
      .json({ message: "NO dress found for this specific seller" });
  }
  return res.status(200).json({
    message: "all dresess fetched successfully",
    dresess,
  });
};

const update_dress = async (req, res) => {
  try {
    const { title, price, description, category, images } = req.body;
    const dressId = req.params.id;
    const updatedDress = await dressModel.findByIdAndUpdate(
      dressId,
      {
        title,
        price,
        description,
        category,
        images,
      },
      {
        new: true,
      },
    );
    return res.status(200).json({
      message: "dress updated successfully",
      updatedDress,
    });
  } catch (error) {
    console.log("error while updating dress :", error);
    return res.status(500).json({
      message: "server side error",
    });
  }
};

const delete_dress = async (req, res) => {
  try {
    const dressId = req.params.id;
    const deletedDress = await dressModel.findByIdAndDelete(dressId);
    return res.status(200).json({
      message: "dress deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting dress :", error);
    return res.status(500).json({ message: "server side error" });
  }
};

const fetchRequest = async (req, res) => {
  try {
    const requests = await requestModel.find({
      status: "open",
    }).sort({createdAt:-1})
    if (requests.length === 0) {
      return res.status(200).json({ message: "No requests exist",requests:[]
       });
    }

    return res.status(200).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    console.log("error while fetching request :", error);
    return res.status(500).json({
      message: "server side error while fetching request",
    });
  }
};

const submitProposal = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await requestModel.findById(requestId);
    if (!request) {
      return res.status(404).json({
        message: "request not found",
      });
    }
    const { price, timeline, message } = req.body;
    if (!price || !timeline || !message) {
      return res.status(400).json({
        message: "fields must have valid input",
      });
    }
    const existingProposal = request.proposals.find(
      (proposal) => proposal.sellerId.toString() === req.user._id.toString(),
    );
    if (existingProposal) {
      return res.status(400).json({
        message: "you already submitted a proposal",
      });
    }
    request.proposals.push({
      sellerId: req.user._id,
      price,
      timeline,
      message,
    });
    await request.save();
    return res.status(201).json({
      message: "propsals send successfully",
      request,
    });
  } catch (error) {
    console.log("error while sending proposals :", error);
    return res.status(500).json({
      message: "server side error while sending proposals",
    });
  }
};

module.exports = {
  add_dress,
  get_dresses,
  get_single_dress,
  update_dress,
  delete_dress,
  fetchRequest,
  submitProposal,
  getMyDress,
};
