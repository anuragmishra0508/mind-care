const express = require('express');
const { addMoodEntry, getMoodHistory } = require('../controllers/moodController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(addMoodEntry).get(getMoodHistory);

module.exports = router;
