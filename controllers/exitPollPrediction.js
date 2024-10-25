const ExitPollPrediction = require("../models/exitPollPrediction");

exports.addExitPollPrediction = async (req, res) => {
  const userId = req.user._id;
  try {
    const { exitPollContestId, prediction } = req.body;
    const exitPollPrediction = new ExitPollPrediction({
      userId,
      exitPollContestId,
      prediction,
    });
    await exitPollPrediction.save();
    res.status(201).json({
      success: true,
      message: "Exit poll prediction added successfully",
      data: exitPollPrediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyExitPollPrediction = async (req, res) => {
  const userId = req.user._id;
  try {
    const exitPollPrediction = await ExitPollPrediction.find({
      userId,
    }).populate({
      path: "exitPollContestId",
      populate: {
        path: "exitPoll",
      },
    });

    res.status(200).json({
      success: true,
      message: "Exit poll prediction fetched successfully",
      data: exitPollPrediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getExitPollPredictionById = async (req, res) => {
  const { id } = req.params;
  try {
    const exitPollPrediction = await ExitPollPrediction.findById(id).populate({
      path: "exitPollContestId",
      populate: {
        path: "exitPoll",
      },
    });
    res.status(200).json({
      success: true,
      message: "Exit poll prediction fetched successfully",
      data: exitPollPrediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllExitPollPrediction = async (req, res) => {
  try {
    const exitPollPrediction = await ExitPollPrediction.find()
      .populate({
        path: "exitPollContestId",
        populate: {
          path: "exitPoll",
        },
      })
      .populate("userId");
    res.status(200).json({
      success: true,
      message: "Exit poll prediction fetched successfully",
      data: exitPollPrediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
