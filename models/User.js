const mongoose = require("mongoose");

//modelo User en mongodb
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }], // Referencias a los autos favoritos
});

module.exports = mongoose.model("User", userSchema);
