const MoodEntry = require('../models/MoodEntry');

exports.addMoodEntry = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const entry = await MoodEntry.create(req.body);
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const entries = await MoodEntry.find({ user: req.user.id }).sort({ date: 1 });
    res.status(200).json({ success: true, count: entries.length, data: entries });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
