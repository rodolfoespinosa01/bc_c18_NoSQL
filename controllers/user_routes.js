const router = require('express').Router();

const User = require('../models/User');

// Get All Users
router.get('/users', async (req, res) => {
  const users = await User.find()

  res.json(users);
});

// Get by user ID
router.get('/user/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id)
  

  res.status(200).json(user);
});

// Create a user
router.post('/user', async (req, res) => {
  try {
const user = await User.create(req.body);

res.json(user)
  } catch(err) {
   console.log(err)
  }
});

// Delete a user
router.delete('/user/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const user = await User.findByIdAndDelete(user_id); // Find the user by ID
  if (!user) {
    return res.status(404).json({ error: 'No user by this ID' })
  }
  res.status(200).json({ message: 'Delete Success' });
});


router.put('/user/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updateData = req.body; // You can send the updated data in the request body

    // Find the user by ID and update it
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;