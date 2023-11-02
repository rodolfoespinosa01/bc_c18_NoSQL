const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use a getter method to format the timestamp on query
reactionSchema.path('createdAt').get(function (value) {
  // Format the timestamp using your preferred format (e.g., ISO)
  return value.toISOString();
});

module.exports = reactionSchema;