const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Gemini API key is required. Please set GOOGLE_GEMINI_API_KEY environment variable.');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,
      }
    });
  }

  // async makeRequest(prompt, maxRetries = 3) {
  //   for (let attempt = 1; attempt <= maxRetries; attempt++) {
  //     try {
  //       const result = await this.model.generateContent(prompt);
  //       const response = await result.response;
  //       return response.text();
  //     } catch (error) {
  //       if (error.message.includes('SAFETY')) {
  //         throw new Error('Content was blocked due to safety restrictions.');
  //       }
  //       if (attempt === maxRetries) {
  //         throw new Error('AI service temporarily unavailable.');
  //       }
  //       await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
  //     }
  //   }
  // }
  async makeRequest(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini error details:', error);  //  <<-- ADD THIS!
      if (error.message.includes('SAFETY')) {
        throw new Error('Content was blocked due to safety restrictions.');
      }
      if (attempt === maxRetries) {
        throw new Error('AI service temporarily unavailable.');
      }
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}


  // ENHANCED: Smart optimization that checks syntax first, then complexity
  async optimizeCode(code, language) {
    const prompt = `
As an expert code optimizer, analyze this ${language} code and provide intelligent optimization:

CODE:
\`\`\`${language}
${code}
\`\`\`

Please follow this decision process:

1. **First, check for SYNTAX ERRORS**:
   - If there are syntax errors, fix them and return corrected code
   - Priority: Fix syntax before optimization

2. **Then, analyze TIME COMPLEXITY**:
   - Identify the current time complexity (e.g., O(n), O(n²), O(n³))
   - If complexity is O(n²) or worse, provide optimized version
   - If complexity is already optimal (O(1), O(log n), O(n)), suggest minor improvements

3. **Response Format**:
\`\`\`
DECISION: [SYNTAX_FIX | COMPLEXITY_OPTIMIZATION | MINOR_IMPROVEMENTS]

CURRENT_COMPLEXITY: O(...)

OPTIMIZED_CODE:
\`\`\`${language}
[Your optimized/corrected code here]
\`\`\`

CHANGES_MADE:
- [List specific changes]
- [Explain why each change improves the code]

PERFORMANCE_IMPACT:
- Time complexity: [before] → [after]
- Expected performance gain: [X%] faster
- Memory usage: [better/same/slightly more]
\`\`\`

Focus on:
- Fixing syntax errors first (highest priority)
- Reducing time complexity for slow algorithms
- Using efficient data structures (hashmaps, sets, etc.)
- Eliminating nested loops where possible
- Improving algorithmic approach
`;

    const optimization = await this.makeRequest(prompt);
    return {
      optimization,
      originalCode: code,
      language,
      timestamp: new Date().toISOString(),
      type: 'smart_optimization'
    };
  }

  // Enhanced analysis that includes time complexity detection
  async analyzeCode(code, language) {
    const prompt = `
Analyze this ${language} code comprehensively:

CODE:
\`\`\`${language}
${code}
\`\`\`

Provide analysis in this format:

## Code Quality Score: [1-10]/10

## Syntax Check:
- ✅ No syntax errors OR ❌ [List syntax errors found]

## Time Complexity Analysis:
- Current complexity: O(...)
- Performance rating: [Excellent/Good/Fair/Poor]
- Bottlenecks: [identify slow parts]

## Issues Found:
- [List bugs, logic errors, or inefficiencies]

## Optimization Opportunities:
- [Suggest specific algorithmic improvements]
- [Recommend better data structures]

## Best Practices:
- [Code style and maintainability suggestions]

Keep analysis concise but thorough.
`;

    const analysis = await this.makeRequest(prompt);
    return {
      analysis,
      language,
      timestamp: new Date().toISOString(),
      type: 'comprehensive_analysis'
    };
  }

  async explainCode(code, language) {
    const prompt = `
Explain this ${language} code in simple terms:

CODE:
\`\`\`${language}
${code}
\`\`\`

## What This Code Does:
[Brief overview]

## Step-by-Step Breakdown:
[Go through the code line by line]

## Time Complexity:
- This algorithm runs in: O(...)
- Performance: [Fast/Medium/Slow] for large inputs

## Key Concepts Used:
[Explain programming concepts]

## Real-World Use Cases:
[Where this code might be used]

Use simple language and provide examples.
`;

    const explanation = await this.makeRequest(prompt);
    return {
      explanation,
      language,
      timestamp: new Date().toISOString(),
      type: 'explanation'
    };
  }

  // Additional methods remain the same...
  async generateDocumentation(code, language) {
    const prompt = `Generate comprehensive documentation for this ${language} code with proper format and examples.`;
    const documentation = await this.makeRequest(prompt);
    return {
      documentation,
      language,
      timestamp: new Date().toISOString(),
      type: 'documentation'
    };
  }

  async convertCode(code, fromLanguage, toLanguage) {
    const prompt = `Convert this ${fromLanguage} code to ${toLanguage}, maintaining functionality and following best practices.`;
    const conversion = await this.makeRequest(prompt);
    return {
      conversion,
      fromLanguage,
      toLanguage,
      originalCode: code,
      timestamp: new Date().toISOString(),
      type: 'conversion'
    };
  }

  async fixBugs(code, language, errorMessage = '') {
    const prompt = `Debug and fix this ${language} code. ${errorMessage ? `Error: ${errorMessage}` : ''} Provide corrected code with explanation.`;
    const bugFix = await this.makeRequest(prompt);
    return {
      bugFix,
      originalCode: code,
      language,
      errorMessage,
      timestamp: new Date().toISOString(),
      type: 'bug_fix'
    };
  }
}

module.exports = new AIService();
