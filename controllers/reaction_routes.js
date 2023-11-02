const router = require('express').Router();

const Reaction = require('../models/Reaction');

// Get All Users
router.get('/reactions', async (req, res) => {
  const reactions = await Reaction.find()

  res.json(reactions);
});

router.post('/reaction', async (req, res) => {
  try {
const reaction = await Reaction.create(req.body);

res.json(reaction)
  } catch(err) {
   console.log(err)
  }
})

module.exports = router;