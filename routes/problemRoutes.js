const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// Get all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});

// Create a new problem
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      testCases,
      constraints,
      hints,
      exampleCode,
    } = req.body;

    const problem = new Problem({
      title,
      description,
      difficulty,
      testCases,
      constraints,
      hints,
      exampleCode,
    });

    await problem.save();
    res.json({ message: "Problem created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the problem" });
  }
});

module.exports = router;
