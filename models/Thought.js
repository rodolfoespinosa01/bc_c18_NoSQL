const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction", // Reference to the Reaction model
    },
  ],
});

// Define a virtual field for reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
