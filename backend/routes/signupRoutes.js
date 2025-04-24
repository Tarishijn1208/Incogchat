const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, email, password, gender } = req.body;  // ✅ Include gender

  try {
    if (!name || !email || !password || !gender) {  // ✅ Ensure gender is provided
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const userId = `user_${randomNum}`;

    const newUser = new User({ name, email: email.toLowerCase(), password, userId, gender });

    await newUser.save();

    res.status(201).json({ message: "Signup successful", userId: newUser.userId });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

module.exports = router;
