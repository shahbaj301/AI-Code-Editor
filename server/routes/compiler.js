const express = require('express');
const rateLimit = require('express-rate-limit');
const compilerController = require('../controllers/compilerController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for code execution (more restrictive)
const compilerRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 code executions per minute
  message: {
    success: false,
    message: 'Too many code executions. Please wait a minute before trying again.'
  }
});

// Apply rate limiting to execution endpoint
router.post('/execute', compilerRateLimit, auth, compilerController.executeCode);

// Get supported languages (no auth required)
router.get('/languages', compilerController.getSupportedLanguages);

module.exports = router;
