const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/auth_middleware");
const { allowedRole } = require("../middlewares/role_middleware");
const {
  request,
  getRequest,
  acceptProposal,
  deleteProposal,
  fetchProposals
} = require("../controllers/buyer_controller");

router
  .route("/request")
  .post(authorization, allowedRole(["buyer"]), request)
  .get(authorization, allowedRole(["buyer"]), getRequest);

  router
  .route("/fetchingproposal")
  .get(authorization, allowedRole(["buyer"]), fetchProposals)

  router
  .route("/proposal/:proposalId/:requestId")
  .delete(authorization, allowedRole(["buyer"]), deleteProposal)

router
  .route("/acceptProposal/:requestId/:proposalId")
  .post(authorization, allowedRole(["buyer"]), acceptProposal);

  

module.exports = router;
