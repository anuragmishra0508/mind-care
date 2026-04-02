const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  moodScore: {
    type: Number,
    required: [true, 'Please add a mood score from 1 (lowest) to 10 (highest)'],
    min: 1,
    max: 10,
  },
  sleepHours: {
    type: Number,
    required: [true, 'Please add sleep duration in hours'],
    min: 0,
    max: 24,
  },
  stressLevel: {
    type: Number,
    required: [true, 'Please add a stress level from 1 (lowest) to 10 (highest)'],
    min: 1,
    max: 10,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
