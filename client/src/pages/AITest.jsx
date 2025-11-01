import React, { useState } from 'react';
import { motion } from 'framer-motion';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';
import { Sparkles, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const AITest = () => {
  const [inputCode, setInputCode] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputCode.trim()) {
      toast.error('Please paste some code');
      return;
    }
    setLoading(true);
    try {
      const res = await aiService.analyzeCode(inputCode, 'javascript');

      let parsedResponse = res.data;

      // Handle case: API returns as a string with or without ```json blocks
      if (typeof parsedResponse === 'string') {
        parsedResponse = parsedResponse.replace(/```json|```/gi, '').trim();
        try {
          parsedResponse = JSON.parse(parsedResponse);
        } catch (e) {
          console.warn('Could not parse outer JSON:', e);
        }
      }

      // Handle case: overall_assessment is JSON string
      if (parsedResponse?.overall_assessment && typeof parsedResponse.overall_assessment === 'string') {
        let cleaned = parsedResponse.overall_assessment.replace(/```json|```/gi, '').trim();
        try {
          parsedResponse = JSON.parse(cleaned);
        } catch (e) {
          console.warn('overall_assessment is plain text, keeping as-is');
        }
      }

      console.log('Parsed Response:', parsedResponse);
      setResponse(parsedResponse);

    } catch (err) {
      console.error('AI request error:', err);
      toast.error('AI request failed');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-6 space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            Code Analysis Results
          </h2>

          {/* Overall Assessment */}
          {response.overall_assessment && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Overall Assessment</h3>
              <p className="text-blue-700">{response.overall_assessment}</p>
            </div>
          )}

          {/* Issues */}
          {response.issues && response.issues.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">🚨 Issues Found:</h3>
              <div className="space-y-3">
                {response.issues.map((issue, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start gap-2">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">{issue.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                          {issue.line && (
                            <span className="text-sm text-gray-500">Line {issue.line}</span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{issue.description}</p>
                        {issue.suggestion && (
                          <div className="bg-green-50 p-2 rounded text-sm border border-green-200">
                            <strong>💡 Suggestion:</strong> {issue.suggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {response.improvements && response.improvements.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">✨ Suggested Improvements:</h3>
              <div className="space-y-3">
                {response.improvements.map((improvement, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800 mb-1">📖 {improvement.category}</div>
                    <p className="text-green-700 mb-2">{improvement.description}</p>
                    {improvement.example && (
                      <div className="bg-white p-2 rounded border font-mono text-sm">
                        <strong>Example:</strong><br />
                        <code>{improvement.example}</code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Notes */}
          {response.learning_notes && response.learning_notes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">📚 Learning Notes:</h3>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <ul className="space-y-2">
                  {response.learning_notes.map((note, index) => (
                    <li key={index} className="text-purple-700 flex items-start">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Positive Aspects */}
          {response.positive_aspects && response.positive_aspects.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">✅ Good Practices Found:</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <ul className="space-y-2">
                  {response.positive_aspects.map((aspect, index) => (
                    <li key={index} className="text-green-700 flex items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                      {aspect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Fallback */}
          {(!response.overall_assessment &&
            (!response.issues || response.issues.length === 0) &&
            (!response.improvements || response.improvements.length === 0) &&
            (!response.learning_notes || response.learning_notes.length === 0) &&
            (!response.positive_aspects || response.positive_aspects.length === 0)) && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">No analysis data available. Please try analyzing some code.</p>
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Sparkles className="w-6 h-6 mr-2 text-yellow-500" /> 
        AI Code Analysis Playground
      </h1>

      <div className="bg-white border rounded-lg p-4 mb-4">
        <textarea
          className="w-full border rounded-lg p-3 font-mono resize-y min-h-[200px]"
          placeholder="Paste your JavaScript code here..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze Code
            </>
          )}
        </button>
      </div>

      {renderResponse()}
    </motion.div>
  );
};

export default AITest;
