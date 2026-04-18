const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const config = require('../config/config');


const createAdmin = async () => {
  try {
    const email = config.ADMIN_EMAIL;
    const password = config.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
  } catch (err) {
    console.error("Admin creation error:", err);
  }
};

module.exports = createAdmin;