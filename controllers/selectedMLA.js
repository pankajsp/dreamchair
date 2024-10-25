const SelectedMLA = require("../models/selectedMLA");
const MLA = require("../models/mla");
const MLAPointsByUser = require("../models/mlaPointsByUser");
const Contest = require("../models/Contest");

exports.createSelectedMLA = async (req, res) => {
  const userId = req.user._id;
  const { mlaId, contestId, predictionSeat } = req.body;

  try {
    const selectedMLA = await SelectedMLA.create({
      userId,
      mlaId,
      contestId,
      predictionSeat,
    });

    const mla = await MLA.findById(mlaId);
    const mlaPointsByUser = await MLAPointsByUser.findOne({ userId, mlaId });
    const contest = await Contest.findById(contestId);
    if (contest.spotsFilled >= contest.spots) {
      return res.json({ message: "Contest is full" });
    } else {
      contest.spotsFilled += 1;
      await contest.save();
    }
    if (mlaPointsByUser) {
      return res.status(201).json({ message: "success", selectedMLA });
    } else {
      await MLAPointsByUser.create({
        userId,
        mlaId,
      });
      mla.points += ((mla.points === 0 ? 1 : mla.points) / 10000) * 500;
      await mla.save();
      res.status(201).json({ message: "success", selectedMLA });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContestByUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const selectedMLAs = await SelectedMLA.find({ userId })
      .populate("mlaId")
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
    res.status(200).json(selectedMLAs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContestByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedMLAs = await SelectedMLA.findById(id)
      .populate("mlaId")
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
    res.status(200).json(selectedMLAs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSelectedMLA = async (req, res) => {
  try {
    const selectedMLAs = await SelectedMLA.find()
      .populate("mlaId")
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
      })
      .populate("userId");
    res.status(200).json(selectedMLAs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
