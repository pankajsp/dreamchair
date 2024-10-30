const ExitPollContest = require("../models/ExitPollContest");

exports.addExitPollContest = async (req, res) => {
  try {
    const { exitPoll, spots, entryFee, winingAmount, upTo, teamsWin } =
      req.body;

    const contest = new ExitPollContest({
      exitPoll,
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

exports.addBulkExitPollContest = async (req, res) => {
  try {
    const contests = await ExitPollContest.insertMany(req.body);
    res.status(201).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExitPollContests = async (req, res) => {
  try {
    const contests = await ExitPollContest.find().populate("exitPoll");
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExitPollContestById = async (req, res) => {
  try {
    const contest = await ExitPollContest.findById(req.params.id).populate(
      "exitPoll"
    );
    res.status(200).json(contest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExitPollContestById = async (req, res) => {
  const { exitPoll, spots, entryFee, winingAmount, upTo, teamsWin } = req.body;
  try {
    const contest = await ExitPollContest.findByIdAndUpdate(
      req.params.id,
      {
        exitPoll,
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

exports.deleteExitPollContestById = async (req, res) => {
  try {
    await ExitPollContest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fillExitPollContestById = async (req, res) => {
  const { spots } = req.body;
  try {
    const contest = await ExitPollContest.findById(req.params.id);
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

exports.getExitPollContestsByExitPollId = async (req, res) => {
  try {
    const contests = await ExitPollContest.find({
      exitPoll: req.params.exitPollId,
    });
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
