const requestModel = require("../models/request_model");

const request = async (req, res) => {
  const { budget , description, deadline } = req.body;
  const buyerId = req.user._id;
  if (!budget || !description || !deadline || !buyerId) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const newRequest = await requestModel.create({
      buyerId,
      budget,
      description,
      deadline,
    });

    return res.status(201).json({
      message: "request send successfully",
      newRequest,
    });
  } catch (error) {
    console.log("error while sending request:", error);
    return res
      .status(500)
      .json({ message: "server side error while sending request" });
  }
};

const getRequest = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const request = await requestModel.find({ buyerId }).sort({createdAt:-1});
    if (request.length === 0) {
      return res.status(200).json({ message: "request not found",request:[] });
    }
    return res.status(200).json({
      message: "request fetched successfully",
      request,
    });
  } catch (error) {
    console.log("error while getting request by buyer:", error);
    return res.status(500).json({
      message: "server side error while getting request by buyer",
    });
  }
};

const acceptProposal = async (req, res) => {
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
      (proposal) => proposal._id.toString() === proposalId,
    );
    if (!proposal) {
      return res.status(400).json({
        message: "proposal not found",
      });
    }
    request.proposals.forEach((proposal) => {
      if (proposal._id.toString() === proposalId.toString()) {
        proposal.status = "accepted";
      } else {
        proposal.status = "rejected";
      }
    });
    request.status = "closed";
    await request.save();

    return res.status(200).json({
      message: "proposal accepted successfully",
      request,
    });
  } catch (error) {
    console.log("error while accepting proposal : ", error);
    return res.status(500).json({
      message: "server side error while  accepting proposals",
    });
  }
};

module.exports = { request, getRequest, acceptProposal };
