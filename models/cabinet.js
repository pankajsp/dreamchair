const mongoose = require("mongoose");

const cabinetSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  sortName: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cabinet = mongoose.model("Cabinet", cabinetSchema);

module.exports = Cabinet;
