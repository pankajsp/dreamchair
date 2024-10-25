const mongoose = require("mongoose");

const upiGatewaysSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UpiGateways = mongoose.model("UpiGateways", upiGatewaysSchema);

module.exports = UpiGateways;
