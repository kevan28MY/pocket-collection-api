const express = require("express");
const {
  addCar,
  listCars,
  increaseCarQuantity,
  decreaseCarQuantity,
  getCarByCode,
  getCarsByYear,
  addCarToFavorites,
  listFavoriteCars,
} = require("../controllers/carControllers.js");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware.js");

//
router.post("/add", verifyToken, addCar);
router.get("/", verifyToken, listCars);
//
router.put("/increase/:carId", verifyToken, increaseCarQuantity);
router.put("/decrease/:carId", verifyToken, decreaseCarQuantity);
//
router.get("/search/code/:code", verifyToken, getCarByCode);
router.get("/search/year/:year", verifyToken, getCarsByYear);
//
router.post("/favorites/:carId", verifyToken, addCarToFavorites);
router.get("/favorites", verifyToken, listFavoriteCars);

module.exports = router;
