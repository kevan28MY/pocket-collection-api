const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = async () => {
  // Definir la URI de la base de datos según el entorno
  const dbUri =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_URL
      : process.env.DB_URL;

  try {
    await mongoose.connect(dbUri);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

if (require.main === module) {
  connectDB();
}

module.exports = connectDB;
