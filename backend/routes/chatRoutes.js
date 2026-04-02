const express = require('express');
const { chatWithBot } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', chatWithBot);

module.exports = router;
