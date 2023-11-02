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

module.exports = router;