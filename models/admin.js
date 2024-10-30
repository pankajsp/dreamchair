const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
