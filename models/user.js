const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
    unique: true,
  },
  otp: {
    type: Number,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  referral: {
    type: String,
  },
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
