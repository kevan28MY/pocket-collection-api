const mongoose = require("mongoose");

//modelo Car en mongodb
const carSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Car", carSchema);
