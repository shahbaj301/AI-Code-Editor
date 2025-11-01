const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  code: {
    type: String,
    required: [true, 'Code content is required'],
    maxlength: [50000, 'Code cannot exceed 50000 characters']
  },
  // CHANGED: Renamed from 'language' to 'programmingLanguage'
  programmingLanguage: {
    type: String,
    required: [true, 'Programming language is required'],
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'html', 'css', 'typescript', 'php', 'ruby', 'go', 'rust', 'sql', 'json', 'xml']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  category: {
    type: String,
    enum: ['algorithm', 'function', 'class', 'component', 'utility', 'template', 'snippet', 'project', 'other'],
    default: 'snippet'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  metadata: {
    linesOfCode: {
      type: Number,
      default: 0
    },
    fileSize: {
      type: Number,
      default: 0
    },
    complexity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  aiAnalysis: {
    suggestions: [{
      type: String
    }],
    complexity: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced']
    },
    performance: {
      type: String,
      enum: ['poor', 'good', 'excellent']
    },
    lastAnalyzed: {
      type: Date
    }
  },
  versions: [{
    version: {
      type: Number,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    changes: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  stats: {
    views: {
      type: Number,
      default: 0
    },
    forks: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance - UPDATED field name
codeSnippetSchema.index({ userId: 1, createdAt: -1 });
codeSnippetSchema.index({ programmingLanguage: 1 }); // CHANGED
codeSnippetSchema.index({ tags: 1 });
codeSnippetSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to calculate metadata
codeSnippetSchema.pre('save', function(next) {
  if (this.isModified('code')) {
    this.metadata.linesOfCode = this.code.split('\n').length;
    this.metadata.fileSize = Buffer.byteLength(this.code, 'utf8');
    
    // Simple complexity calculation based on code length
    if (this.metadata.linesOfCode < 10) {
      this.metadata.complexity = 'low';
    } else if (this.metadata.linesOfCode < 50) {
      this.metadata.complexity = 'medium';
    } else {
      this.metadata.complexity = 'high';
    }
  }
  next();
});

// Method to create a new version
codeSnippetSchema.methods.createVersion = function(newCode, changes = '') {
  const latestVersion = this.versions.length > 0 
    ? Math.max(...this.versions.map(v => v.version))
    : 0;
  
  this.versions.push({
    version: latestVersion + 1,
    code: this.code, // Save current code as version
    changes: changes
  });
  
  this.code = newCode; // Update to new code
};

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
