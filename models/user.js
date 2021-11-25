const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  token: {
    index: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "teacher"],
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
