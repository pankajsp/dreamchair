const mongoose = require("mongoose");

const mlaPointsByUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mlaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MLA",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MLAPointsByUser = mongoose.model(
  "MLAPointsByUser",
  mlaPointsByUserSchema
);

module.exports = MLAPointsByUser;
