const express = require('express');
const { getRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getRecommendations);

module.exports = router;
