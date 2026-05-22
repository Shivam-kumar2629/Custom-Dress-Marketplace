require("dotenv").config();
const app = require("./app");
const connectDb = require("./db/connet_db");

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

start();
