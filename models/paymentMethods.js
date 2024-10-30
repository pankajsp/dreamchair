const mongoose = require("mongoose");

const paymentMethodsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentMethods = mongoose.model("PaymentMethods", paymentMethodsSchema);

module.exports = PaymentMethods;
