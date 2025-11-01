
import { useState } from 'react';
import * as AI from '../../api/ai';
import Loader from '../UI/Loader';

export default function AIAssistant({ code, language }) {
  const [activeTab, setActiveTab] = useState('analyze');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const runAIFunction = async (aiFunction, tabName) => {
    if (!code || !code.trim()) {
      setError('Please write some code first');
      return;
    }
    if (!language) {
      setError('Please select a programming language');
      return;
    }
    setActiveTab(tabName);
    setLoading(true);
    setResponse('');
    setError('');
    try {
      const payload = { code: code.trim(), programmingLanguage: language };
      const { data } = await aiFunction(payload);
      let responseText = '';
      if (data?.data) {
        const aiData = data.data;
        responseText = aiData.analysis || aiData.explanation || aiData.optimization || aiData.bugFix || aiData.documentation || aiData.conversion;
        if (!responseText && typeof aiData === 'object') {
          responseText = JSON.stringify(aiData, null, 2);
        }
        if (!responseText) {
          responseText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        }
      } else {
        responseText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      }
      setResponse(responseText || 'AI analysis completed, but no readable content was returned.');
    } catch (err) {
      let errorMessage = 'AI service error. Please try again.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (text) => {
    if (!text) return 'No response to display';
    if (typeof text === 'object') {
      try {
        return JSON.stringify(text, null, 2);
      } catch {
        return 'Unable to display response';
      }
    }
    return text;
  };

  return (
    <div className="ai-panel bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col h-full max-w-xl mx-auto">
      {/* Header */}
      <div className="ai-header flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
        <h3 className="text-cyan-400 font-extrabold text-xl">🤖 AI Assistant</h3>
        <span className="debug-info text-gray-400 text-sm">Lang: {language || 'none'}</span>
      </div>
      {/* Tabs */}
      <div className="ai-tabs flex gap-2 mb-4">
        {['analyze', 'explain', 'optimize'].map(tab => (
          <button
            key={tab}
            className={`ai-tab px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-sm shadow
              ${activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white scale-105 shadow-cyan-400/30'
                : 'bg-gray-700 text-gray-200 hover:bg-cyan-700 hover:text-white hover:scale-105'
              }`}
            onClick={() => runAIFunction(AI[tab], tab)}
            disabled={loading || !code?.trim()}
            title={
              tab === 'analyze'
                ? 'Analyze code quality and performance'
                : tab === 'explain'
                ? 'Explain what the code does'
                : 'Get optimization suggestions'
            }
          >
            {tab === 'analyze'
              ? '📊 Analyze'
              : tab === 'explain'
              ? '💡 Explain'
              : '⚡ Optimize'}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="ai-content flex-1 overflow-auto bg-gray-900 rounded-xl p-4 min-h-[220px] max-h-[400px]">
        {loading && (
          <div className="ai-loading flex flex-col items-center justify-center gap-3 text-gray-300 animate-pulse">
            <Loader small />
            <p>🤖 AI is analyzing your {language} code...</p>
            <p className="loading-subtext text-sm">This may take a few seconds...</p>
          </div>
        )}
        {error && (
          <div className="ai-error bg-gradient-to-r from-red-700 to-pink-700 text-red-50 p-4 rounded-xl">
            <h4 className="mb-2 font-semibold text-lg">❌ Error</h4>
            <p>{error}</p>
            <div className="error-help mt-2">
              <p className="font-semibold">💡 Try this:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ensure your code is written</li>
                <li>Check internet connection</li>
                <li>Wait a moment, retry</li>
              </ul>
            </div>
          </div>
        )}
        {response && !loading && !error && (
          <div className="ai-response text-gray-100 overflow-x-auto">
            <div className="response-header font-bold mb-2 text-cyan-300">
              🎯 AI {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </div>
            {/* Line wrapping and scrollable */}
            <div className="response-content font-mono text-sm rounded bg-gray-900 border border-cyan-800 p-3 shadow-inner overflow-y-auto max-h-[270px] whitespace-pre-wrap break-words">
              {renderResponse(response)}
            </div>
          </div>
        )}
        {!loading && !response && !error && (
          <div className="ai-placeholder flex flex-col items-center justify-center text-gray-500">
            <div className="placeholder-icon text-5xl mb-2">🤖</div>
            <h4 className="mb-1 font-bold text-lg text-gray-400">AI Assistant Ready</h4>
            <p className="mb-3">Select a function above to analyze your {language || 'code'}</p>
            <div className="ai-tips bg-gray-700 p-3 rounded-xl w-full max-w-md mx-auto">
              <h5 className="font-semibold mb-2 text-cyan-200">Available Features:</h5>
              <div className="tips-grid grid grid-cols-1 gap-2">
                <div className="tip bg-gray-600 p-2 rounded">
                  <strong>📊 Analyze</strong>
                  <p>Code quality & performance review</p>
                </div>
                <div className="tip bg-gray-600 p-2 rounded">
                  <strong>💡 Explain</strong>
                  <p>Step-by-step code explanation</p>
                </div>
                <div className="tip bg-gray-600 p-2 rounded">
                  <strong>⚡ Optimize</strong>
                  <p>Performance improvement suggestions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
