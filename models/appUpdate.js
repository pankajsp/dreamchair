const mongoose = require("mongoose");

const appUpdateSchema = new mongoose.Schema({
  isUpdate: {
    type: Boolean,
    default: false,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AppUpdate = mongoose.model("AppUpdate", appUpdateSchema);

module.exports = AppUpdate;
