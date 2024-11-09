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


exports.fillExitPollContestSpotsByRandom = async (req, res) => {
  try {
    // List of partyIds to update
    const partyIds = [
      "6712326c401bc01b9ed24fb0",
      "671234c8bda6e8954ccf9d3b",
      "671234d5bda6e8954ccf9d3e",
    ];

    // Find all documents with the specified partyIds and increase spotsFilled by 8%
    const updatePromises = partyIds.map(async (partyId) => {
      const contest = await ExitPollContest.findOne({ exitPoll: partyId });
      if (contest) {
        const increment = Math.round(contest.spots * 0.08); // Calculate 8% of spots
        return ExitPollContest.updateOne(
          { _id: contest._id },
          { $inc: { spotsFilled: increment } }
        );
      }
    });

    // Execute all updates in parallel
    await Promise.all(updatePromises);

    res.status(200).json({
      message: "SpotsFilled updated successfully for specified partyIds.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating spotsFilled." });
  }
};

exports.fillExitPollContestSpotsByRandomSecond = async (req, res) => {
  try {
    // List of partyIds to update (new set of IDs)
    const partyIds = [
      "67123531bda6e8954ccf9d47",
      "6712350cbda6e8954ccf9d44",
      "671234f4bda6e8954ccf9d41",
    ];

    // Find all documents with the specified partyIds and increase spotsFilled by 6%
    const updatePromises = partyIds.map(async (partyId) => {
      const contest = await ExitPollContest.findOne({ exitPoll: partyId });
      if (contest) {
        const increment = Math.round(contest.spots * 0.06); // Calculate 6% of spots
        return ExitPollContest.updateOne(
          { _id: contest._id },
          { $inc: { spotsFilled: increment } }
        );
      }
    });

    // Execute all updates in parallel
    await Promise.all(updatePromises);

    res.status(200).json({
      message: "SpotsFilled updated successfully for specified partyIds.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating spotsFilled." });
  }
};

