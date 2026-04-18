const jwt = require("jsonwebtoken");
const config = require('../config/config');


exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};