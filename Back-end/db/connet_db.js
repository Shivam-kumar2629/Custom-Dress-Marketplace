const mongoose = require("mongoose");

const connetDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("mongoDb connected");
  } catch (error) {
    console.log("db-connection-error:", error);
    process.exit(1);
  }
};

module.exports = connetDb;
