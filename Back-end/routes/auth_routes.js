const express = require("express");
const router = express.Router();
const { register, login,logOut } = require("../controllers/auth_controller");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").post(logOut);

module.exports = router;
