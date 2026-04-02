const MoodEntry = require('../models/MoodEntry');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recentEntries = await MoodEntry.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(7);

    let recommendations = [];

    if (recentEntries.length === 0) {
      recommendations.push("Start tracking your daily mood and sleep to generate personalized AI insights.");
      recommendations.push("General Tip: Drinking 8 glasses of water a day significantly improves mental clarity.");
      return res.status(200).json({ success: true, data: recommendations });
    }

    // Averages over the last 7 entries
    const avgSleep = recentEntries.reduce((acc, curr) => acc + curr.sleepHours, 0) / recentEntries.length;
    const avgStress = recentEntries.reduce((acc, curr) => acc + curr.stressLevel, 0) / recentEntries.length;
    const avgMood = recentEntries.reduce((acc, curr) => acc + curr.moodScore, 0) / recentEntries.length;

    // Sleep logic
    if (avgSleep < user.baseSleepTarget) {
      recommendations.push(`You've averaged ${avgSleep.toFixed(1)} hours of sleep recently, below your target of ${user.baseSleepTarget}. Consider establishing a calming pre-bed routine tonight.`);
    } else {
      recommendations.push(`Excellent work maintaining your sleep schedule around ${avgSleep.toFixed(1)} hours! Consistent sleep is key to emotional stability.`);
    }

    // Stress logic
    if (avgStress > user.baseStressLevel + 2) {
      recommendations.push("Your stress levels have been elevated. Try incorporating a 10-minute mindfulness or deep breathing exercise into your afternoon.");
    } else if (avgStress <= user.baseStressLevel) {
       recommendations.push("Your stress levels have been wonderfully managed recently. Keep up whatever techniques you're currently using.");
    }

    // Mood logic
    if (avgMood < 5) {
      recommendations.push("We've noticed your mood has been a bit lower than usual. Be gentle with yourself, and don't hesitate to lean on a friend or spend time on a favorite hobby.");
    } else if (avgMood >= 8) {
      recommendations.push("You're on a fantastic streak of positive moods! Take a moment to reflect on what's going well right now.");
    }
    
    // Fallback if somehow there's only 1 or 2
    if (recommendations.length < 3) {
      recommendations.push("Daily Tip: Taking a 15-minute walk outside can naturally reduce cortisol levels and boost endorphins.");
    }

    res.status(200).json({ success: true, data: recommendations });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
