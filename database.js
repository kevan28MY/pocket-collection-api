const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUri =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_URL
      : process.env.DB_URL;
  try {
    await mongoose.connect(dbUri);
    console.log(
      `Connected to ${
        process.env.NODE_ENV === "test" ? "test" : "production"
      } database`
    );
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

module.exports = connectDB;
