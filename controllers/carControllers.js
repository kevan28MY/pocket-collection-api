const Car = require("../models/Car");
const User = require("../models/User");

const validateCarData = (data) => {
  const { code, model, year, category, quantity } = data;
  if (!code || !model || !year || !category || quantity === undefined) {
    return { isValid: false, message: "All fields are required" };
  }
  return { isValid: true };
};

const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({ message, data });
};

exports.addCar = async (req, res) => {
  const validation = validateCarData(req.body);
  if (!validation.isValid) {
    return sendResponse(res, 400, validation.message);
  }

  const { code, model, year, category, quantity } = req.body;

  try {
    const newCar = new Car({
      user: req.user.userId,
      code,
      model,
      year,
      category,
      quantity,
    });
    const savedCar = await newCar.save();
    res.status(201).json({ message: "Car added to collection", car: savedCar });
  } catch (error) {
    sendResponse(res, 500, "Error adding car to collection", error);
  }
};

//listar todos los autos del usuario
exports.listCars = async (req, res) => {
  const { userId } = req.user;

  try {
    const cars = await Car.find({ user: userId });
    res.status(200).json({ cars: cars || [] });
  } catch (error) {
    console.error("Error retrieving cars:", error);
    res
      .status(500)
      .json({ message: "Error retrieving cars", error: error.message });
  }
};

//aumentar cantidad de auto especifico
exports.increaseCarQuantity = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return sendResponse(res, 404, "Car not found");
    }

    car.quantity += 1; // Incrementa la cantidad
    await car.save(); // Guarda los cambios

    sendResponse(res, 200, "Car quantity increased", car);
  } catch (error) {
    sendResponse(res, 500, "Error updating car quantity", error);
  }
};

//dismiuir o eliminar auto
exports.decreaseCarQuantity = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.quantity -= 1; // Disminuye la cantidad

    if (car.quantity === 0) {
      await Car.findByIdAndDelete(carId); // Elimina el coche
      return res.status(200).json({
        message: "Car deleted as its quantity reached zero",
      });
    }

    await car.save(); // Guarda el coche si aún tiene cantidad

    return res.status(200).json({
      message: "Car quantity decreased",
      data: car,
    });
  } catch (error) {
    console.error("Error updating car quantity:", error);
    return res.status(500).json({ message: "Error updating car quantity" });
  }
};

//buscar auto especifico por codigo
exports.getCarByCode = async (req, res) => {
  const { code } = req.params;

  try {
    const car = await Car.findOne({ code });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ car });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error finding car by code", error });
  }
};

//buscar autos por año
exports.getCarsByYear = async (req, res) => {
  const { year } = req.params;

  try {
    const cars = await Car.find({ year });
    return res.status(200).json({
      message: "Cars retrieved successfully",
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error searching cars by year",
      error: error.message,
    });
  }
};

//agregar auto a favoritos
exports.addCarToFavorites = async (req, res) => {
  const { carId } = req.params;
  const { userId } = req.user;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si el coche ya está en favoritos y retornar inmediatamente si es así
    if (user.favorites.includes(carId)) {
      return res.status(400).json({ message: "Car is already in favorites" });
    }

    // Agregar el coche a los favoritos
    user.favorites.push(carId);

    // Guardar el usuario solo si es necesario
    await user.save();

    return res.status(200).json({ message: "Car added to favorites" });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding car to favorites",
      error: error.message || error,
    });
  }
};

//visualizar todos los autos favoritos:
exports.listFavoriteCars = async (req, res) => {
  const { userId } = req.user;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findById(userId).populate("favorites"); // Populate para obtener detalles de cada auto
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.favorites.length === 0) {
      return res
        .status(200)
        .json({ message: "User doesn't have favorite cars" });
    }
    // Enviar lista de autos favoritos del usuario
    return res.status(200).json({
      message: "Favorite cars retrieved successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error to list favorites cars",
      error: error.message || error,
    });
  }
};
