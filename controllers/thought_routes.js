const router = require('express').Router();

const Thought = require('../models/Thought');

// Get All Users
router.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()

  res.json(thoughts);
});

// Create new thought
router.post('/thought', async (req, res) => {
  try {
const thought = await Thought.create(req.body);

res.json(thought)
  } catch(err) {
   console.log(err)
  }
})

// Get by thought ID
router.get('/thought/:thought_id', async (req, res) => {
  const thought_id = req.params.thought_id;

  const thought = await Thought.findById(thought_id)

  res.status(200).json(thought);
});

// Delete a thought
router.delete('/thought/:thought_id', async (req, res) => {
  const thought_id = req.params.thought_id;
  const thought = await Thought.findByIdAndDelete(thought_id); // Find the thought by ID
  if (!thought) {
    return res.status(404).json({ error: 'No thought by this ID' })
  }
  res.status(200).json({ message: 'Delete Success' });
});

// Update thought by ID
router.put('/thought/:thought_id', async (req, res) => {
  try {
    const thoughtId = req.params.thought_id;
    const updateData = req.body; 

 
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updateData, { new: true });

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;