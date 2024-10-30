const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
  },
  cabinetContestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CabinetContest",
  },
  exitPollContestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExitPollContest",
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  receipt: {
    type: String,
  },
  signature: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WalletTransaction = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);

module.exports = WalletTransaction;
