const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth_routes");
const sellerRouter = require("./routes/seller_routes");
const buyerRouter = require("./routes/buyer_routes");
const orderRouter = require("./routes/order_routes");
const cors = require("cors");

const app = express();

 

app.use(cors({
  origin: "https://custom-dress-marketplace.onrender.com",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.options("/", cors());

app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(sellerRouter);
app.use(buyerRouter);
app.use(orderRouter);

module.exports = app;
