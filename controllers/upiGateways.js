const UpiGateways = require("../models/upiGateways");

exports.createUpiGateway = async (req, res) => {
  const { key } = req.body;
  try {
    const upiGateway = await UpiGateways.create({ key });
    res.status(201).json({
      success: true,
      message: "UPI gateway created successfully",
      data: upiGateway,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create UPI gateway",
      error: error.message,
    });
  }
};

exports.getUpiGateways = async (req, res) => {
  try {
    const upiGateways = await UpiGateways.find();
    res.status(200).json({
      success: true,
      message: "UPI gateways fetched successfully",
      data: upiGateways,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch UPI gateways",
      error: error.message,
    });
  }
};

exports.deleteUpiGateway = async (req, res) => {
  const { id } = req.params;
  try {
    await UpiGateways.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "UPI gateway deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete UPI gateway",
      error: error.message,
    });
  }
};

exports.updateUpiGateway = async (req, res) => {
  const { id } = req.params;
  const { key } = req.body;
  try {
    const upiGateway = await UpiGateways.findByIdAndUpdate(id, { key });
    res.status(200).json({
      success: true,
      message: "UPI gateway updated successfully",
      data: upiGateway,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update UPI gateway",
      error: error.message,
    });
  }
};

exports.getUpiGatewayById = async (req, res) => {
  const { id } = req.params;
  try {
    const upiGateway = await UpiGateways.findById(id);
    res.status(200).json({
      success: true,
      message: "UPI gateway fetched successfully",
      data: upiGateway,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch UPI gateway",
      error: error.message,
    });
  }
};

exports.getRandomUpiGateway = async (req, res) => {
  try {
    const upiGateway = await UpiGateways.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json({
      success: true,
      message: "UPI gateway fetched successfully",
      data: upiGateway.length > 0 ? upiGateway[0].key : null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch UPI gateway",
      error: error.message,
    });
  }
};
