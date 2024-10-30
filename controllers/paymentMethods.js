const PaymentMethods = require("../models/paymentMethods");

exports.createPaymentMethods = async (req, res) => {
  const { name } = req.body;

  try {
    const paymentMethods = await PaymentMethods.create({ name });
    res.status(200).json({
      success: true,
      message: "Payment methods created successfully",
      paymentMethods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethods.find();
    res.status(200).json({
      success: true,
      paymentMethods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.updatePaymentMethods = async (req, res) => {
  const { id, action } = req.params;

  try {
    if (action === "true" || action === true) {
      await PaymentMethods.updateMany({ isActive: true }, { isActive: false });
    } else if (action === "false" || action === false) {
      const otherPaymentMethod = await PaymentMethods.findOneAndUpdate(
        { isActive: false },
        { isActive: true },
        { new: true }
      );
      if (!otherPaymentMethod) {
        return res.status(400).json({
          message: "No inactive payment methods available to activate.",
        });
      }
    }

    const paymentMethods = await PaymentMethods.findByIdAndUpdate(id, {
      isActive: action === "true" || action === true ? true : false,
    });

    const paymentMethodsToSend = await PaymentMethods.find();

    res.status(200).json({
      success: true,
      message: "Payment methods updated successfully",
      paymentMethods: paymentMethodsToSend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getActivePaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethods.find({ isActive: true });
    res.status(200).json({
      success: true,
      paymentMethods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
