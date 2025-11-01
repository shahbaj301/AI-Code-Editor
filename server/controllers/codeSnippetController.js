const CodeSnippet = require('../models/CodeSnippet');
const User = require('../models/User');

// @desc    Get all saved codes by user
// @route   GET /api/codes
// @access  Private
const getCodes = async (req, res) => {
  try {
    const { page = 1, limit = 10, language, category, search } = req.query;

    let query = { userId: req.user._id };

    // Add filters
    if (language) query.language = language;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const codes = await CodeSnippet.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CodeSnippet.countDocuments(query);

    res.json({
      success: true,
      data: {
        codes,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalCodes: total
      }
    });
  } catch (error) {
    console.error('Get codes error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching codes'
    });
  }
};

// @desc    Get single saved code by id
// @route   GET /api/codes/:id
// @access  Private
const getCodeById = async (req, res) => {
  try {
    const code = await CodeSnippet.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'Code not found'
      });
    }

    // Increment view count
    code.stats.views += 1;
    await code.save();

    res.json({
      success: true,
      data: code
    });
  } catch (error) {
    console.error('Get code by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching code'
    });
  }
};

// @desc    Create new saved code
// @route   POST /api/codes
// @access  Private
const createCode = async (req, res) => {
  try {
    const { title, description, code, programmingLanguage, tags, category, isPublic } = req.body;
    if (!title || !code || !programmingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Title, code, and programming language are required'
      });
    }


    const newCode = new CodeSnippet({
      title,
      description,
      code,
      programmingLanguage, // CHANGED
      tags: tags || [],
      category: category || 'snippet',
      isPublic: isPublic || false,
      userId: req.user._id
    });

    await newCode.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        'stats.totalCodes': 1,
        'stats.totalLinesOfCode': newCode.metadata.linesOfCode
      }
    });

    res.status(201).json({
      success: true,
      message: 'Code saved successfully',
      data: newCode
    });
  } catch (error) {
    console.error('Create code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving code'
    });
  }
};

// @desc    Update existing code snippet
// @route   PUT /api/codes/:id
// @access  Private
const updateCode = async (req, res) => {
  try {
    const code = await CodeSnippet.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'Code not found'
      });
    }

    const { title, description, newCode, language, tags, category, isPublic, changes } = req.body;

    // Store old lines of code for stats update
    const oldLinesOfCode = code.metadata.linesOfCode;

    if (title !== undefined) code.title = title;
    if (description !== undefined) code.description = description;
    if (language !== undefined) code.language = language;
    if (tags !== undefined) code.tags = tags;
    if (category !== undefined) code.category = category;
    if (isPublic !== undefined) code.isPublic = isPublic;

    if (newCode !== undefined && newCode !== code.code) {
      // Create new version
      code.createVersion(newCode, changes || 'Updated code');
    }

    await code.save();

    // Update user stats if lines of code changed
    const linesDifference = code.metadata.linesOfCode - oldLinesOfCode;
    if (linesDifference !== 0) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { 'stats.totalLinesOfCode': linesDifference }
      });
    }

    res.json({
      success: true,
      message: 'Code updated successfully',
      data: code
    });
  } catch (error) {
    console.error('Update code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating code'
    });
  }
};

// @desc    Delete saved code
// @route   DELETE /api/codes/:id
// @access  Private
const deleteCode = async (req, res) => {
  try {
    const code = await CodeSnippet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'Code not found'
      });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        'stats.totalCodes': -1,
        'stats.totalLinesOfCode': -code.metadata.linesOfCode
      }
    });

    res.json({
      success: true,
      message: 'Code deleted successfully'
    });
  } catch (error) {
    console.error('Delete code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting code'
    });
  }
};

// @desc    Get version history of a code snippet
// @route   GET /api/codes/:id/history
// @access  Private
const getCodeHistory = async (req, res) => {
  try {
    const code = await CodeSnippet.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).select('versions title');

    if (!code) {
      return res.status(404).json({
        success: false,
        message: 'Code not found'
      });
    }

    res.json({
      success: true,
      data: {
        title: code.title,
        versions: code.versions.sort((a, b) => b.version - a.version)
      }
    });
  } catch (error) {
    console.error('Get code history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching code history'
    });
  }
};

// @desc    Get code statistics
// @route   GET /api/codes/stats
// @access  Private
const getCodeStats = async (req, res) => {
  try {
    const stats = await CodeSnippet.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalCodes: { $sum: 1 },
          totalLines: { $sum: '$metadata.linesOfCode' },
          languageStats: {
            $push: '$language'
          }
        }
      }
    ]);

    const languageCount = {};
    if (stats[0]?.languageStats) {
      stats.languageStats.forEach(lang => {
        languageCount[lang] = (languageCount[lang] || 0) + 1;
      });
    }

    res.json({
      success: true,
      data: {
        totalCodes: stats[0]?.totalCodes || 0,
        totalLines: stats?.totalLines || 0,
        languageDistribution: languageCount
      }
    });
  } catch (error) {
    console.error('Get code stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching code statistics'
    });
  }
};

module.exports = {
  getCodes,
  getCodeById,
  createCode,
  updateCode,
  deleteCode,
  getCodeHistory,
  getCodeStats
};
