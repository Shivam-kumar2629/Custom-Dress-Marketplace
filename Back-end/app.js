const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth_routes");
const sellerRouter = require("./routes/seller_routes");
const buyerRouter = require("./routes/buyer_routes");
const orderRouter = require("./routes/order_routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(sellerRouter);
app.use(buyerRouter);
app.use(orderRouter);
app.use(orderRouter);

module.exports = app;
