const CabinetContestSelectedMember = require("../models/cabinetContestSelectedMember");
const CabinetContest = require("../models/cabinetContest");

exports.createCabinetContestSelectedMember = async (req, res) => {
  const userId = req.user._id;
  try {
    const { cabinetContestId, members } = req.body;
    const cabinetContestSelectedMember = new CabinetContestSelectedMember({
      userId,
      cabinetContestId,
      members,
    });

    const cabinetContest = await CabinetContest.findById(cabinetContestId);
    if (cabinetContest) {
      cabinetContest.spotsFilled += 1;
      await cabinetContest.save();
    }

    await cabinetContestSelectedMember.save();
    res.status(201).json({
      success: true,
      message: "Cabinet contest selected member created successfully",
      data: cabinetContestSelectedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCabinetContestSelectedMemberByCabinetContestId = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;
    const cabinetContestSelectedMember =
      await CabinetContestSelectedMember.find({
        userId,
      }).populate({
        path: "cabinetContestId",
        populate: {
          path: "cabinet",
        },
      });
    res.status(200).json({
      success: true,
      message: "Cabinet contest selected member fetched successfully",
      data: cabinetContestSelectedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCabinetContestSelectedMember = async (req, res) => {
  try {
    const { cabinetContestId } = req.params;
    const cabinetContestSelectedMember =
      await CabinetContestSelectedMember.findById(cabinetContestId)
        .populate({
          path: "cabinetContestId",
          populate: {
            path: "cabinet",
          },
        })
        .populate({
          path: "members.cabinetMemberId",
          model: "CabinetMember",
        });
    res.status(200).json({
      success: true,
      message: "Cabinet contest selected member fetched successfully",
      data: cabinetContestSelectedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.cabinetContestReport = async (req, res) => {
  try {
    const cabinetContestSelectedMember =
      await CabinetContestSelectedMember.find()
        .populate({
          path: "cabinetContestId",
          populate: {
            path: "cabinet",
          },
        })
        .populate("userId");
    res.status(200).json({
      success: true,
      message: "Cabinet contest selected member fetched successfully",
      data: cabinetContestSelectedMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.cabinetContestReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const cabinetContestReport = await CabinetContestSelectedMember.findById(id)
      .populate({
        path: "cabinetContestId",
        populate: {
          path: "cabinet",
        },
      })
      .populate("userId")
      .populate("members.cabinetMemberId");
    res.status(200).json({
      success: true,
      message: "Cabinet contest report fetched successfully",
      data: cabinetContestReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
