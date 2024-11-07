const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied" });
  }

  const actualToken = token.split(" ")[1]; // Extraer el token real
  try {
    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
