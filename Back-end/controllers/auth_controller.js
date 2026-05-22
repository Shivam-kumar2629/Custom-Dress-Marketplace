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
    res.cookie("refreshToken", refreshToken);
    res.cookie("accessToken", accessToken);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "user logged In successfully",
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

module.exports = { register, login, logOut };
