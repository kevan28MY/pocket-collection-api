const mongoose = require("mongoose");

//modelo Car en mongodb
const carSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true }, // Código del carro
  model: { type: String, required: true }, // Modelo del carro
  year: { type: Number, required: true }, // Año del carro
  category: { type: String, required: true }, // Categoría del carro
  quantity: { type: Number, default: 1 }, // Cantidad
  imageUrl: { type: String }, // URL de la imagen
});

module.exports = mongoose.model("Car", carSchema);
