const express = require('express');
const aiController = require('../controllers/aiController');
const { auth } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Rate limiting for AI endpoints (more restrictive due to Gemini quotas)
const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 AI requests per windowMs
  message: {
    success: false,
    message: 'Too many AI requests, please try again later. Gemini has usage limits.'
  }
});

// Apply rate limiting to all AI routes
router.use(aiRateLimit);

// Core AI routes (All require authentication)
router.post('/analyze', auth, aiController.analyzeCode);
router.post('/explain', auth, aiController.explainCode);
router.post('/optimize', auth, aiController.optimizeCode);

// Additional AI features
router.post('/document', auth, aiController.generateDocumentation);
router.post('/convert', auth, aiController.convertCode);
router.post('/fix', auth, aiController.fixBugs);

module.exports = router;
