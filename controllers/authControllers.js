const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// User registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "The email is already registered" });
    }

    //
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "The username is already taken" });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error :", error });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error :", error });
  }
};
