const router = require('express').Router();
const mongoose = require('mongoose');
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

// Get All Users
router.get('/reactions', async (req, res) => {
  const reactions = await Reaction.find()

  res.json(reactions);
});


// Create a reaction and attach to thought
router.put('/reaction/:thought_id', async (req, res) => {
  const thought_id = req.params.thought_id;
  const reactionData = req.body;

  if (!thought_id) {
    return res.status(404).json({ message: 'thought_id not found' });
  }

  // Generate a new reactionId
  const reactionId = new mongoose.Types.ObjectId(); // Import mongoose if not already imported


  await Reaction.create({ ...reactionData, reactionId });

  // find the thought that was put into the the url and update the reaction array by using the push method displayed below.
  const updated_thought = await Thought.findByIdAndUpdate(thought_id, {
    $push: {
      reactions: reactionId 
    }
  }, { new: true });

  return res.json({
    message: 'Reaction created and added to thought!',
    thought: updated_thought
  });
});




// Remove friend from user (remove reaction from thought)
router.delete('/thought_reaction/:thought_id/:reaction_id', async (req, res) => {
  const thought_id = req.params.thought_id;
  const reaction_id = req.params.reaction_id;

  try {
    if (!reaction_id) {
      return res.status(404).json({ error: 'No friend by this ID' });
    }

    // Check if the thought with thought_id exists
    const thought = await Thought.findById(thought_id);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    await Thought.findByIdAndUpdate(thought_id, {
      $pull: { reactions: reaction_id }
    });

    res.status(200).json({ message: 'Delete Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});





module.exports = router;