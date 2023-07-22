const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      // Generate a JWT token with an expiration time (e.g., 1 day)
      const token = jwt.sign({ userId: user._id }, "secret_key", {
        expiresIn: "1d",
      });
      res.json({ message: "Login successful", token });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
