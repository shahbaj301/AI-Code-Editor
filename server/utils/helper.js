const crypto = require('crypto');

// Generate random string
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Calculate code complexity
const calculateComplexity = (code) => {
  const lines = code.split('\n').length;
  const functions = (code.match(/function|def |class |=>|func /g) || []).length;
  const loops = (code.match(/for|while|forEach/g) || []).length;
  const conditions = (code.match(/if|else|switch|case/g) || []).length;
  
  const complexityScore = lines + (functions * 2) + (loops * 3) + (conditions * 2);
  
  if (complexityScore < 20) return 'low';
  if (complexityScore < 60) return 'medium';
  return 'high';
};

// Detect programming language from code content
const detectLanguage = (code) => {
  const patterns = {
    javascript: [/console\.log/, /function\s+\w+/, /const\s+\w+/, /let\s+\w+/, /var\s+\w+/, /=>/],
    python: [/def\s+\w+/, /import\s+\w+/, /from\s+\w+\s+import/, /print\s*\(/, /if\s+__name__\s*==\s*['"']__main__['"']/],
    java: [/public\s+class/, /public\s+static\s+void\s+main/, /System\.out\.print/, /import\s+java\./],
    cpp: [/#include\s*</, /std::/, /cout\s*<</, /using\s+namespace\s+std/],
    c: [/#include\s*</, /printf\s*\(/, /int\s+main\s*\(/],
    html: [/<html>/, /<head>/, /<body>/, /<div>/, /<p>/],
    css: [/\{[^}]*\}/, /color\s*:/, /background\s*:/, /margin\s*:/],
    php: [/<\?php/, /echo\s+/, /\$\w+/, /function\s+\w+\s*\(/]
  };

  for (const [language, langPatterns] of Object.entries(patterns)) {
    const matches = langPatterns.filter(pattern => pattern.test(code)).length;
    if (matches >= 2) return language;
  }

  return 'text';
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Paginate results
const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Validate ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Rate limiting helper
const createRateLimitKey = (userId, action) => {
  return `rate_limit:${userId}:${action}`;
};

module.exports = {
  generateRandomString,
  sanitizeInput,
  formatFileSize,
  calculateComplexity,
  detectLanguage,
  generateSlug,
  paginate,
  formatDate,
  isValidObjectId,
  createRateLimitKey
};
