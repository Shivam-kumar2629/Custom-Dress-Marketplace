const express = require("express");
const router = express.Router();
const { register, login,logOut,getMe } = require("../controllers/auth_controller");
const authorization = require("../middlewares/auth_middleware");
 

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").post(logOut);
router.route("/getme").get(authorization,getMe)

module.exports = router;
