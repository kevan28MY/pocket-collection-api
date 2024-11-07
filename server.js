const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Auth.routes.js");
const carRoutes = require("./routes/car.routes");
const connectDB = require("./database.js");

dotenv.config();
const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

//establish routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

//inicar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

module.exports = app;
