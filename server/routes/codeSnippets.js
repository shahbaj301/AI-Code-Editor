const express = require('express');
const codeSnippetController = require('../controllers/codeSnippetController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// CRUD routes for code snippets
router.get('/', codeSnippetController.getCodes);
router.get('/stats', codeSnippetController.getCodeStats);
router.get('/:id', codeSnippetController.getCodeById);
router.post('/', codeSnippetController.createCode);
router.put('/:id', codeSnippetController.updateCode);
router.delete('/:id', codeSnippetController.deleteCode);
router.get('/:id/history', codeSnippetController.getCodeHistory);

module.exports = router;
