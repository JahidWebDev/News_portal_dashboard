require("dotenv").config();
const mongoose = require("mongoose");

const db_connect = async () => {
  try {
    const DB_URL =
      process.env.NODE_ENV === "production"
        ? process.env.DB_PRODUCTION_URL
        : process.env.DB_LOCAL_URL;

    console.log("Connecting DB:", DB_URL);

    await mongoose.connect(DB_URL);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = db_connect; 