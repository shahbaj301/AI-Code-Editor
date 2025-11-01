const axios = require('axios');
const rateLimit = require('express-rate-limit');

// Language mappings for Piston API
const LANGUAGE_MAP = {
  'javascript': { language: 'javascript', version: '18.15.0' },
  'python': { language: 'python', version: '3.10.0' },
  'java': { language: 'java', version: '15.0.2' },
  'cpp': { language: 'c++', version: '10.2.0' },
  'c': { language: 'c', version: '10.2.0' },
  'typescript': { language: 'typescript', version: '5.0.3' },
  'php': { language: 'php', version: '8.2.3' },
  'ruby': { language: 'ruby', version: '3.0.1' },
  'go': { language: 'go', version: '1.16.2' },
  'rust': { language: 'rust', version: '1.68.2' },
  'sql': { language: 'sqlite3', version: '3.36.0' }
};

// File extensions for different languages
const FILE_EXTENSIONS = {
  'javascript': 'js',
  'python': 'py',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'typescript': 'ts',
  'php': 'php',
  'ruby': 'rb',
  'go': 'go',
  'rust': 'rs',
  'sql': 'sql'
};

// @desc    Compile and execute code
// @route   POST /api/compile
// @access  Private
const executeCode = async (req, res) => {
  try {
    const { code, language, input = '' } = req.body;

    // Validate input
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required'
      });
    }

    if (!LANGUAGE_MAP[language]) {
      return res.status(400).json({
        success: false,
        message: `Unsupported language: ${language}`
      });
    }

    // Code length limit (10KB)
    if (code.length > 10000) {
      return res.status(400).json({
        success: false,
        message: 'Code is too long. Maximum 10,000 characters allowed.'
      });
    }

    console.log(`🔄 Compiling ${language} code for user ${req.user?.username || 'anonymous'}`);

    const languageConfig = LANGUAGE_MAP[language];
    const fileExtension = FILE_EXTENSIONS[language];

    // Prepare request for Piston API
    const pistonRequest = {
      language: languageConfig.language,
      version: languageConfig.version,
      files: [
        {
          name: `main.${fileExtension}`,
          content: code
        }
      ],
      stdin: input,
      args: [],
      compile_timeout: 10000,  // 10 seconds
      run_timeout: 3000        // 3 seconds
    };

    // Execute code using Piston API
    const pistonResponse = await axios.post(
      'https://emkc.org/api/v2/piston/execute',
      pistonRequest,
      {
        timeout: 15000, // 15 seconds total timeout
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = pistonResponse.data;
    
    // Format response
    let output = '';
    let hasError = false;

    if (result.compile && result.compile.stderr) {
      output += '📝 Compilation Errors:\n' + result.compile.stderr + '\n\n';
      hasError = true;
    }

    if (result.run) {
      if (result.run.stdout) {
        output += '✅ Output:\n' + result.run.stdout;
      }
      
      if (result.run.stderr) {
        output += (output ? '\n\n' : '') + '⚠️ Runtime Errors:\n' + result.run.stderr;
        hasError = true;
      }
      
      if (!result.run.stdout && !result.run.stderr && result.run.code === 0) {
        output += '✅ Program executed successfully (no output)';
      }
      
      if (result.run.code !== 0 && result.run.code !== null) {
        output += (output ? '\n\n' : '') + `❌ Exit code: ${result.run.code}`;
        hasError = true;
      }
    }

    if (!output.trim()) {
      output = '⚠️ No output generated';
    }

    // Log execution stats
    console.log(`✅ Code execution completed for ${language}:`, {
      success: !hasError,
      outputLength: output.length,
      executionTime: result.run?.time || 'N/A'
    });

    res.json({
      success: true,
      data: {
        output: output,
        hasError: hasError,
        language: language,
        executionTime: result.run?.time || 0,
        memoryUsage: result.run?.memory || 0,
        exitCode: result.run?.code || 0,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Code execution error:', error);
    
    let errorMessage = 'Code execution failed';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Execution timeout - code took too long to run';
    } else if (error.response?.status === 429) {
      errorMessage = 'Too many requests - please wait a moment before trying again';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get supported languages
// @route   GET /api/compile/languages
// @access  Public
const getSupportedLanguages = async (req, res) => {
  try {
    const languages = Object.keys(LANGUAGE_MAP).map(lang => ({
      language: lang,
      displayName: lang.charAt(0).toUpperCase() + lang.slice(1),
      version: LANGUAGE_MAP[lang].version,
      extension: FILE_EXTENSIONS[lang]
    }));

    res.json({
      success: true,
      data: languages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching supported languages'
    });
  }
};

module.exports = {
  executeCode,
  getSupportedLanguages
};
