const CabinetContest = require("../models/cabinetContest");

exports.addCabinetContest = async (req, res) => {
  try {
    const { cabinet, spots, entryFee, winingAmount, upTo, teamsWin } = req.body;

    const contest = new CabinetContest({
      cabinet,
      spots,
      entryFee,
      winingAmount,
      upTo,
      teamsWin,
      prizePool: entryFee * spots,
    });
    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBulkCabinetContest = async (req, res) => {
  try {
    const contests = await CabinetContest.insertMany(req.body);
    res.status(201).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetContests = async (req, res) => {
  try {
    const contests = await CabinetContest.find().populate("cabinet");
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetContestById = async (req, res) => {
  try {
    const contest = await CabinetContest.findById(req.params.id).populate(
      "cabinet"
    );
    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCabinetContestById = async (req, res) => {
  const { cabinet, spots, entryFee, winingAmount, upTo, teamsWin } = req.body;
  try {
    const contest = await CabinetContest.findByIdAndUpdate(
      req.params.id,
      {
        cabinet,
        spots,
        entryFee,
        winingAmount,
        upTo,
        teamsWin,
        prizePool: entryFee * spots,
      },
      { new: true }
    );
    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCabinetContestById = async (req, res) => {
  try {
    await CabinetContest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fillCabinetContestById = async (req, res) => {
  const { spots } = req.body;
  try {
    const contest = await CabinetContest.findById(req.params.id);
    if (contest.spotsFilled + spots > contest.spots) {
      return res.status(400).json({ error: "Contest is full" });
    } else {
      contest.spotsFilled += spots;
      await contest.save();
      res.status(200).json(contest);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCabinetContestsByCabinetId = async (req, res) => {
  try {
    const contests = await CabinetContest.find({
      cabinet: req.params.cabinetId,
    });
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
