const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Auth.routes.js");
const connectDB = require("./database.js");

dotenv.config();
const app = express();
app.use(express.json());

//conexion base de datos
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connection"))
//   .catch((error) => console.error("MongoDB connection fail :", error));

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connection"))
//   .catch((error) => console.error("MongoDB connection fail :", error));
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

//establish routes
app.use("/api/auth", authRoutes);

//inicar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

module.exports = app;
