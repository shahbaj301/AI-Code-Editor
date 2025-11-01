const OpenAI = require('openai');

const gemini = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// AI Service Configuration
const AI_CONFIG = {
  model: 'gemini-2.0-flash', // Use Gemini model instead of GPT
  maxTokens: 1000,
  temperature: 0.7,
  
  // Keep your existing prompts - they work with Gemini too
  prompts: {
    codeReview: `You are an expert programming instructor. Analyze the following code and provide constructive feedback focusing on:
    1. Code correctness and functionality
    2. Best practices and code style
    3. Performance optimizations
    4. Potential bugs or issues
    5. Suggestions for improvement
    
    Keep your feedback educational and encouraging for a student learning to code.`,
    
    codeExplanation: `You are a helpful programming tutor. Explain the following code in simple, easy-to-understand terms. Focus on:
    1. What the code does overall
    2. How each part works
    3. Key programming concepts used
    4. Why certain approaches were chosen
    
    Make your explanation clear for a programming student.`,
    
    debuggingHelp: `You are a debugging expert. Help identify and explain the issue in this code. Provide:
    1. What's wrong with the code
    2. Why it's causing problems
    3. How to fix it
    4. Tips to avoid similar issues in the future
    
    Be supportive and educational in your response.`
  }
};

module.exports = {
  gemini,
  AI_CONFIG
};
