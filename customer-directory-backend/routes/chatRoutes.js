const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');

router.post('/chat', chat);                   
router.get('/ping', (req, res) => res.json({ ok: true }));

module.exports = router;
