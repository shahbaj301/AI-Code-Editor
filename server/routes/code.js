const express = require('express');
const { protect } = require('../middleware/auth');
const { runCode } = require('../controllers/codeController');

const router = express.Router();

// Protect route with authentication
router.post('/run', protect, runCode);

module.exports = router;
