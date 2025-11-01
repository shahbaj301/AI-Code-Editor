const aiService = require('../services/aiService');
const User = require('../models/User');

// @desc    Analyze code using Gemini AI
// @route   POST /api/ai/analyze
// @access  Private
const analyzeCode = async (req, res) => {
  try {
    const { code, programmingLanguage } = req.body;

    if (!code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code and programming language are required for AI analysis'
      });
    }

    // Check code length (Gemini has input limits)
    if (code.length > 30000) {
      return res.status(400).json({
        success: false,
        message: 'Code is too long for analysis. Please keep it under 30,000 characters.'
      });
    }

    const analysisResult = await aiService.analyzeCode(code, programmingLanguage);

    // Update user AI usage stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error('AI analyze error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error analyzing code with AI'
    });
  }
};

// @desc    Explain code using Gemini AI
// @route   POST /api/ai/explain
// @access  Private
const explainCode = async (req, res) => {
  try {
    const { code, programmingLanguage } = req.body;

    if (!code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code and programming language are required for explanation'
      });
    }

    if (code.length > 20000) {
      return res.status(400).json({
        success: false,
        message: 'Code is too long for explanation. Please keep it under 20,000 characters.'
      });
    }

    const explanation = await aiService.explainCode(code, programmingLanguage);

    // Update user AI usage stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: explanation
    });
  } catch (error) {
    console.error('AI explain error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error explaining code with AI'
    });
  }
};

// @desc    Optimize code using Gemini AI
// @route   POST /api/ai/optimize
// @access  Private
const optimizeCode = async (req, res) => {
  try {
    const { code, programmingLanguage } = req.body;

    if (!code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code and programming language are required for optimization'
      });
    }

    if (code.length > 25000) {
      return res.status(400).json({
        success: false,
        message: 'Code is too long for optimization. Please keep it under 25,000 characters.'
      });
    }

    const optimizedCode = await aiService.optimizeCode(code, programmingLanguage);

    // Update user AI usage stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: optimizedCode
    });
  } catch (error) {
    console.error('AI optimize error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error optimizing code with AI'
    });
  }
};

// @desc    Generate documentation using Gemini AI
// @route   POST /api/ai/document
// @access  Private
const generateDocumentation = async (req, res) => {
  try {
    const { code, programmingLanguage } = req.body;

    if (!code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code and programming language are required for documentation generation'
      });
    }

    const documentation = await aiService.generateDocumentation(code, programmingLanguage);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: documentation
    });
  } catch (error) {
    console.error('AI document error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating documentation with AI'
    });
  }
};

// @desc    Convert code between languages using Gemini AI
// @route   POST /api/ai/convert
// @access  Private
const convertCode = async (req, res) => {
  try {
    const { code, fromLanguage, toLanguage } = req.body;

    if (!code || !fromLanguage || !toLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code, source language, and target language are required'
      });
    }

    const conversion = await aiService.convertCode(code, fromLanguage, toLanguage);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: conversion
    });
  } catch (error) {
    console.error('AI convert error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error converting code with AI'
    });
  }
};

// @desc    Fix bugs in code using Gemini AI
// @route   POST /api/ai/fix
// @access  Private
const fixBugs = async (req, res) => {
  try {
    const { code, programmingLanguage, errorMessage } = req.body;

    if (!code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Code and programming language are required for bug fixing'
      });
    }

    const bugFix = await aiService.fixBugs(code, programmingLanguage, errorMessage);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.aiQueriesUsed': 1 }
    });

    res.json({
      success: true,
      data: bugFix
    });
  } catch (error) {
    console.error('AI fix error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fixing code with AI'
    });
  }
};

module.exports = {
  analyzeCode,
  explainCode,
  optimizeCode,
  generateDocumentation,
  convertCode,
  fixBugs
};
