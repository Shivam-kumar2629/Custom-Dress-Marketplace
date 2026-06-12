const jwt = require("jsonwebtoken");
const userModel = require("../models/user_model");

const authorization = async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")?.[1];
  try {
    if (!accessToken) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const verifiedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_JWT_SECRET,
    );

    req.userId = verifiedAccessToken.id;
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authorization;
