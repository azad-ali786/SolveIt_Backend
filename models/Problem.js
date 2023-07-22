const mongoose = require("mongoose");
const { Schema } = mongoose;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
  testCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  constraints: {
    type: String,
    required: true,
  },
  hints: [
    {
      type: String,
      required: true,
    },
  ],
  exampleCode: {
    type: String,
    required: true,
  },
});

// Create and export the 'Problem' model
module.exports = mongoose.model("Problem", problemSchema);
