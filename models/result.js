const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  rollno: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
});

module.exports =
  mongoose.models.Result || mongoose.model("Result", resultSchema);
