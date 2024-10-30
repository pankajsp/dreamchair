const WalletTransaction = require("../models/walletTransaction");
const Wallet = require("../models/wallet");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const ReceivedPayment = require("../models/receivedPayment");
const PaymentMethods = require("../models/paymentMethods");

exports.createWalletTransaction = async (req, res) => {
  const userId = req.user._id;
  try {
    const { contestId, cabinetContestId, exitPollContestId, amount } = req.body;
    try {
      var instance = new Razorpay({
        key_id: process.env.ROGERPAY_API_KEY,
        key_secret: process.env.ROGERPAY_SECRET_KEY,
      });

      const receipt = `receipt_${shortid.generate()}`;

      try {
        const options = {
          amount: amount * 100,
          currency: "INR",
          receipt: receipt,
        };

        const order = await instance.orders.create(options);

        const walletTransaction = new WalletTransaction({
          userId: userId,
          contestId,
          cabinetContestId,
          exitPollContestId,
          orderId: order.id,
          amount: order.amount / 100,
          receipt: order.receipt,
          status: order.status,
        });

        await walletTransaction.save();
        res.json(walletTransaction);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create wallet transaction",
      error: error.message,
    });
  }
};

exports.successWalletTransaction = async (req, res) => {
  const { orderId, signature, payment_id } = req.body;
  const userId = req.user._id;
  try {
    const payment = await WalletTransaction.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    payment.signature = signature;
    payment.payment_id = payment_id;
    payment.status = "success";

    let wallet = await Wallet.findOne({ userId });

    const receivedAmount = await ReceivedPayment.findById(
      "6720d44ca03b3a691b2fce5f"
    );

    if (payment.method === "phonepe" && receivedAmount.amount >= 3000000) {
      await PaymentMethods.updateOne({ name: "phonepe" }, { isActive: false });
      await PaymentMethods.updateOne({ name: "razorpay" }, { isActive: true });
      receivedAmount.amount += payment.amount;
      await receivedAmount.save();
    }

    if (payment.method === "razorpay" && receivedAmount.amount >= 990000) {
      await PaymentMethods.updateOne({ name: "phonepe" }, { isActive: true });
      await PaymentMethods.updateOne({ name: "razorpay" }, { isActive: false });
      receivedAmount.amount += payment.amount;
      await receivedAmount.save();
    }

    if (!wallet) {
      wallet = new Wallet({ userId, amount: Number(payment.amount) });
    } else {
      wallet.amount += payment.amount;
    }

    await wallet.save();
    await payment.save();

    res.json({ message: "Payment successful", payment, wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWalletTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const walletTransaction = await WalletTransaction.findById(id);

    res.status(200).json({
      success: true,
      message: "Wallet transaction fetched successfully",
      data: walletTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet transaction",
      error: error.message,
    });
  }
};

exports.getWalletTransaction = async (req, res) => {
  try {
    const walletTransaction = await WalletTransaction.find()
      .populate("userId")
      .populate("contestId")
      .populate("cabinetContestId");
    res.status(200).json({
      success: true,
      message: "Wallet transaction fetched successfully",
      data: walletTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet transaction",
      error: error.message,
    });
  }
};

exports.filterWalletTransaction = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const walletTransaction = await WalletTransaction.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    if (new Date(startDate).getTime() === new Date(endDate).getTime()) {
      const additionalTransactions = await WalletTransaction.find({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate).setDate(new Date(endDate).getDate() + 1),
        },
      });
      walletTransaction.push(...additionalTransactions);
    }

    res.status(200).json({
      success: true,
      message: "Wallet transaction fetched successfully",
      data: walletTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet transaction",
      error: error.message,
    });
  }
};

exports.getWalletTransactionByIdAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const walletTransaction = await WalletTransaction.findById(id)
      .populate("userId")
      .populate({
        path: "cabinetContestId",
        populate: { path: "cabinet" },
      })
      .populate({
        path: "contestId",
        populate: [
          {
            path: "group",
            populate: [
              { path: "partyA" },
              { path: "partyB" },
              { path: "partyC" },
              { path: "partyD" },
            ],
          },
          { path: "district" },
          { path: "constituency" },
        ],
      });
    res.status(200).json({
      success: true,
      message: "Wallet transaction fetched successfully",
      data: walletTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet transaction",
      error: error.message,
    });
  }
};
