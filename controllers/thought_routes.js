const router = require('express').Router();

const Thought = require('../models/Thought');

// Get All Users
router.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find()

  res.json(thoughts);
});

router.post('/thought', async (req, res) => {
  try {
const thought = await Thought.create(req.body);

res.json(thought)
  } catch(err) {
   console.log(err)
  }
})

module.exports = router;