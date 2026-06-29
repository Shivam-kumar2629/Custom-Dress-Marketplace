const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    if (fullName === "" || email == "" || password == "" || role == "") {
      return res.status(400).json({
        message: "all feilds must be filled",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exist",
      });
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "user created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log("server side error while registering:", error);

    return res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.status(400).json({
      message: "all fields must have inputs",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user does not exist !",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        message: "password is incorrect !",
      });
    }

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "10d" },
    );
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "user logged In successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server side error in login",
    });
    console.log("login-error:", error);
  }
};

const logOut = async (req, res) => {
  res.clearCookie("refreshToken").clearCookie("accessToken").status(200).json({
    message: "log-out successfully",
  });
};

const getMe = async (req, res) => {
  const userId = req.user._id;

  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  return res.status(200).json({
    message: "user got successfully",
    user,
  });
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(404).json({ message: "refresh token not found" });
    }
    const verifiedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
    );
    req.userId = verifiedRefreshToken.id;
    const user = await userModel.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "15m" },
    );
    res.cookie("accessToken", newAccessToken);

    return res.status(200).json({
      message: "new accessToken generated.",
    });
  } catch (error) {
    console.log("error while generting new accessToken:", error);
  }
};

module.exports = { register, login, logOut, getMe, refreshToken };
