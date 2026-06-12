const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer_middleware");
const {
  add_dress,
  get_dresses,
  get_single_dress,
  update_dress,
  delete_dress,
  fetchRequest,
  submitProposal,
  getMyDress
} = require("../controllers/seller_controller");
const authorization = require("../middlewares/auth_middleware");
const { allowedRole } = require("../middlewares/role_middleware");

router
  .route("/dresses")
  .post(
    authorization,
    allowedRole(["seller"]),
    upload.array("dressImage", 5),
    add_dress,
  )
  .get(authorization, allowedRole(["seller", "buyer"]), get_dresses);

router
  .route("/dresses/:id")
  .get(authorization, allowedRole(["seller", "buyer"]), get_single_dress)
  .patch(authorization, allowedRole(["seller"]), update_dress)
  .delete(authorization, allowedRole(["seller"]), delete_dress);

  router
  .route("/getmydress")
  .get(authorization, allowedRole(["seller"]), getMyDress)


router
  .route("/seller/request")
  .get(authorization, allowedRole(["seller"]), fetchRequest);

router
  .route("/proposal/:requestId")
  .post(authorization, allowedRole(["seller"]), submitProposal);

module.exports = router;
