const { body, validationResult } = require('express-validator');

// Common validation rules
const validationRules = {
  // User validation
  username: body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-30 characters and contain only letters, numbers, and underscores'),
  
  email: body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  password: body('password')
    .isLength({ min: 6 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must be at least 6 characters with uppercase, lowercase, and number'),

  // Code snippet validation
  codeTitle: body('title')
    .isLength({ min: 1, max: 100 })
    .trim()
    .withMessage('Title must be 1-100 characters'),
  
  codeContent: body('code')
    .isLength({ min: 1, max: 50000 })
    .withMessage('Code must be 1-50000 characters'),
  
  codeLanguage: body('language')
    .isIn(['javascript', 'python', 'java', 'cpp', 'c', 'html', 'css', 'typescript', 'php', 'ruby', 'go', 'rust', 'sql', 'json', 'xml'])
    .withMessage('Invalid programming language'),
  
  codeTags: body('tags')
    .optional()
    .isArray()
    .custom((tags) => {
      if (tags.length > 10) throw new Error('Maximum 10 tags allowed');
      return tags.every(tag => typeof tag === 'string' && tag.length <= 30);
    })
    .withMessage('Tags must be strings with max 30 characters each, max 10 tags'),

  // AI validation
  aiCode: body('code')
    .isLength({ min: 1, max: 10000 })
    .withMessage('Code for AI analysis must be 1-10000 characters'),
  
  aiLanguage: body('language')
    .isIn(['javascript', 'python', 'java', 'cpp', 'c', 'html', 'css', 'typescript', 'php', 'ruby', 'go', 'rust'])
    .withMessage('Unsupported language for AI analysis')
};

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    next();
  };
};

// Pre-defined validation sets
const validationSets = {
  register: [
    validationRules.username,
    validationRules.email,
    validationRules.password
  ],
  
  login: [
    body('email').notEmpty().withMessage('Email or username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  
  createCode: [
    validationRules.codeTitle,
    validationRules.codeContent,
    validationRules.codeLanguage,
    validationRules.codeTags
  ],
  
  aiAnalysis: [
    validationRules.aiCode,
    validationRules.aiLanguage
  ]
};

module.exports = {
  validationRules,
  validate,
  validationSets
};
