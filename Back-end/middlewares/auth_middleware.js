const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");

const authorization = async (req, res, next) => {
  console.log("Cookies:", req.cookies);

  const accessToken =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  console.log("Access Token:", accessToken);

  try {
    if (!accessToken) {
      return res.status(401).json({
        message: "No access token",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);

    console.log("Decoded:", decoded);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authorization;
