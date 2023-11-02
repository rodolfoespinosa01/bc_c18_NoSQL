const router = require('express').Router();

const User = require('../models/User');

// Get All Users
router.get('/users', async (req, res) => {
  const users = await User.find()

  res.json(users);
});

router.post('/user', async (req, res) => {
  try {
const user = await User.create(req.body);

res.json(user)
  } catch(err) {
   console.log(err)
  }
})

module.exports = router;