const router = require('express').Router();

const User = require('../models/User');

// Get All Users
router.get('/users', async (req, res) => {
  const users = await User.find()

  res.json(users);
});

module.exports = router;