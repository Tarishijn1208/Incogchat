const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return success response (including userId for profile display)
    res.json({ message: "Login successful", userId: user.userId, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:userId", authenticateUser, async (req, res) => {
  try {
      // Ensure the requested userId matches the logged-in user's ID
      if (req.params.userId !== req.user.userId) {
          return res.status(403).json({ message: "Access denied" });
      }

      const confessions = await Confession.find({ userId: req.params.userId });
      res.json(confessions);
  } catch (error) {
      res.status(500).json({ message: "Error fetching confessions" });
  }
});


module.exports = router;
