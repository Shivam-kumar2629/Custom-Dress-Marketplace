const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/auth_middleware");
const { allowedRole } = require("../middlewares/role_middleware");
const {
  request,
  getRequest,
  acceptProposal,
} = require("../controllers/buyer_controller");

router
  .route("/request")
  .post(authorization, allowedRole(["buyer"]), request)
  .get(authorization, allowedRole(["buyer"]), getRequest);

router
  .route("/acceptProposal/:requestId/:proposalId")
  .post(authorization, allowedRole(["buyer"]), acceptProposal);

module.exports = router;
