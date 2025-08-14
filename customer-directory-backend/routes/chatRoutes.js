
const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');

router.post('/chat', chat);   // POST /api/ai/chat  { question }

module.exports = router;
