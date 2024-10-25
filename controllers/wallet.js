const Wallet = require("../models/wallet");
const WalletTransaction = require("../models/walletTransaction");
const { v4: uuidv4 } = require("uuid");

exports.getWallet = async (req, res) => {
  const userId = req.user._id;
  try {
    const wallet = await Wallet.findOne({ userId });
    const walletTransactions = await WalletTransaction.find({
      userId,
      status: "success",
    });
    res.status(200).json({
      success: true,
      message: "Wallet fetched successfully",
      data: {
        wallet,
        walletTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet",
      error: error.message,
    });
  }
};

exports.payThoughWallet = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, contestId, cabinetContestId, exitPollContestId } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (wallet.amount < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    const walletTransaction = new WalletTransaction({
      userId,
      orderId: uuidv4(),
      amount,
      contestId,
      cabinetContestId,
      exitPollContestId,
      status: "success",
    });
    await walletTransaction.save();

    wallet.amount -= amount;
    await wallet.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
      data: {
        wallet,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to pay through wallet",
      error: error.message,
    });
  }
};
