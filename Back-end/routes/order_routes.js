const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/auth_middleware");
const { allowedRole } = require("../middlewares/role_middleware");
const {
  customiseOrder,
  order,
  myOrders,
  sellerOrders,
  orderStatus,
} = require("../controllers//order_controller");

router
  .route("/order/:requestId/:proposalId")
  .post(authorization, allowedRole(["buyer"]), customiseOrder);

router
  .route("/order/:dressId")
  .post(authorization, allowedRole(["buyer"]), order);

router
  .route("/order/my-orders")
  .get(authorization, allowedRole(["buyer"]), myOrders);

router
  .route("/order/seller-orders")
  .get(authorization, allowedRole(["seller"]), sellerOrders);

router
  .route("/order/status/:orderId")
  .patch(authorization, allowedRole(["seller"]), orderStatus);
module.exports = router;
