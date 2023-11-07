const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  },
});

// Define the virtual field for friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
