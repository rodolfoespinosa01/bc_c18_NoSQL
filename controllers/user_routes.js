const router = require("express").Router();

const User = require("../models/User");

// Get All Users
router.get("/users", async (req, res) => {
  const users = await User.find();

  const customResponse = users.map((user) => ({
    thoughts: user.thoughts,
    friends: user.friends,
    _id: user._id,
    username: user.username,
    email: user.email,
    friendCount: user.friendCount,
  }));

  res.json(customResponse);
});

// Get by user ID
router.get("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  const user = await User.findById(user_id);

  res.status(200).json(user);
});

// Create a user
router.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

// Add thought to user
router.put("/user_thought/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { thought_id } = req.body;

  try {
    const updated_user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          thoughts: thought_id,
        },
      },
      { new: true }
    );

    return res.json({
      message: "User updated successfully!",
      user: updated_user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});

// Add friend to user
router.put("/user_friend/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const { friend_id } = req.body;

  try {
    const updated_user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          friends: friend_id,
        },
      },
      { new: true }
    );

    return res.json({
      message: "User updated successfully!",
      user: updated_user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
});

// Remove friend from user
router.delete("/user_friend/:user_id/:friend_id", async (req, res) => {
  const user_id = req.params.user_id;
  const friend_id = req.params.friend_id;

  try {
    if (!friend_id) {
      return res.status(404).json({ error: "No friend by this ID" });
    }

    // Check if the user with user_id exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndUpdate(user_id, {
      $pull: { friends: friend_id },
    });

    res.status(200).json({ message: "Delete Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete a user
router.delete("/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const user = await User.findByIdAndDelete(user_id); // Find the user by ID
  if (!user) {
    return res.status(404).json({ error: "No user by this ID" });
  }
  res.status(200).json({ message: "Delete Success" });
});

// Update User
router.put("/user/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updateData = req.body;

    // Find the user by ID and update it
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
