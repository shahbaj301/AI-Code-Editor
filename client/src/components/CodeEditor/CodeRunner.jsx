

import { useState } from 'react';
import { executeCode } from '../../api/compiler';

export default function CodeRunner({ code, language, onClose }) {
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [executionStats, setExecutionStats] = useState(null);

  const runCode = async () => {
    if (!code.trim()) {
      setError('Please write some code first');
      return;
    }

    setRunning(true);
    setError('');
    setOutput('🔄 Compiling and executing your code...\n');

    try {
      let result = '';
      if (['html', 'css'].includes(language)) {
        result = handleClientSideExecution();
      } else {
        const response = await executeCode({
          code: code.trim(),
          language: language,
          input: input.trim()
        });
        if (response.data.success) {
          result = response.data.data.output;
          setExecutionStats({
            executionTime: response.data.data.executionTime,
            memoryUsage: response.data.data.memoryUsage,
            exitCode: response.data.data.exitCode,
            hasError: response.data.data.hasError
          });
        } else {
          result = '❌ Error: ' + response.data.message;
        }
      }
      setOutput(result);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to execute code. Please try again.');
    } finally {
      setRunning(false);
    }
  };

  const handleClientSideExecution = () => {
    switch (language) {
      case 'html':
        return '🌐 HTML code rendered in preview above. Check the iframe for visual output.';
      case 'css':
        return '🎨 CSS code loaded. Apply this to HTML elements to see styling effects.';
      default:
        return 'Code processed successfully.';
    }
  };

  const clearOutput = () => {
    setOutput('');
    setError('');
    setExecutionStats(null);
  };

  const getLanguageEmoji = () => {
    const emojis = {
      javascript: '🟨', python: '🐍', java: '☕', cpp: '⚡', c: '🔧',
      html: '🌐', css: '🎨', typescript: '🔷', php: '🐘', ruby: '💎',
      go: '🚀', rust: '🦀', sql: '📊'
    };
    return emojis[language] || '💻';
  };

  return (
    <div className="code-runner bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-full">
      <div className="runner-header flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
        <h3 className="text-cyan-400 font-semibold text-xl">{getLanguageEmoji()} Code Execution</h3>
        <div className="runner-controls flex gap-2">
          <button
            onClick={runCode}
            disabled={running || !code.trim()}
            className="run-btn bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            {running ? '⏳ Running...' : '▶️ Run Code'}
          </button>
          <button
            onClick={clearOutput}
            className="clear-btn bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            🧹 Clear
          </button>
          <button
            onClick={onClose}
            className="close-btn bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>

      {!['html', 'css', 'json'].includes(language) && (
        <div className="input-section mb-4">
          <label htmlFor="code-input" className="block mb-1 text-gray-300 font-semibold">
            📥 Input (optional):
          </label>
          <textarea
            id="code-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your program (if needed)..."
            className="input-area w-full p-2 rounded bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-vertical"
            rows="3"
          />
        </div>
      )}

      {language === 'html' && output && (
        <div className="html-preview mb-4">
          <h4 className="text-lg font-semibold text-gray-300 mb-2">🌐 HTML Preview:</h4>
          <iframe 
            srcDoc={code}
            title="HTML Preview"
            className="preview-frame w-full h-48 rounded border border-gray-600"
          />
        </div>
      )}

      <div className="output-section bg-gray-900 p-3 rounded mb-4">
        <div className="output-header flex justify-between items-center mb-2">
          <span className="text-gray-400 font-semibold">📤 Output:</span>
          {executionStats && (
            <div className="execution-stats flex gap-4 text-sm text-gray-400">
              <span className="stat">⏱️ {executionStats.executionTime}ms</span>
              <span className="stat">💾 {executionStats.memoryUsage}KB</span>
              <span className={executionStats.exitCode === 0 ? 'stat success text-green-400' : 'stat error text-red-400'}>
                Exit: {executionStats.exitCode}
              </span>
            </div>
          )}
        </div>

        {error ? (
          <pre className="error-output text-red-500 whitespace-pre-wrap">{error}</pre>
        ) : (
          <pre className="code-output text-gray-100 whitespace-pre-wrap">{output || 'Click "Run Code" to execute your program'}</pre>
        )}
      </div>

      <div className="execution-tips bg-gray-800 p-3 rounded">
        <h4 className="text-gray-300 font-semibold mb-2">💡 Tips for {language?.toUpperCase()}:</h4>
        <div className="tips-content whitespace-pre-wrap text-gray-400 text-sm leading-relaxed">
          {getLanguageTips()}
        </div>
      </div>
    </div>
  );

  function getLanguageTips() {
    const tips = {
      javascript: '• Use console.log() to print output\n• Variables: let, const, var\n• Functions: function name() {} or () => {}',
      python: '• Use print() to display output\n• Indentation matters!\n• Variables: name = "value"',
      java: '• Use System.out.println() for output\n• Must have public static void main method\n• Declare variables with type',
      cpp: '• Use cout << for output\n• Include <iostream>\n• Don\'t forget return 0;',
      c: '• Use printf() for output\n• Include <stdio.h>\n• End statements with semicolon',
      html: '• Use tags like <h1>, <p>, <div>\n• Preview shows rendered result\n• Add CSS for styling',
      css: '• Style HTML elements\n• Format: selector { property: value; }\n• Use with HTML for best results'
    };
    return tips[language] || '• Write your code and click Run to execute';
  }
}
