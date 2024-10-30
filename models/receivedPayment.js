const mongoose = require("mongoose");

const ReceivedPaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ReceivedPayment = mongoose.model(
  "ReceivedPayment",
  ReceivedPaymentSchema
);

module.exports = ReceivedPayment;
