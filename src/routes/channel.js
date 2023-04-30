const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Channel = require('../models/channelModel');
const User = require('../models/userModel');
const verifyToken = require('../middleware/verifyToken');


// Get all channels
router.get('/', verifyToken, async (req, res) => {
  try {
    const channels = await Channel.find({});
    res.status(200).json({ channels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create channel
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.userId;

    // Create new channel
    const newChannel = new Channel({
      name,
      description,
      created_by: createdBy,
      members: [createdBy]
    });

    // Save new channel to database
    await newChannel.save();

    // Add new channel to user's channels array
    await User.updateOne(
      { _id: createdBy },
      { $push: { channels: newChannel._id } }
    );

    // Return success response
    res.status(201).json({ message: 'Channel created', channel: newChannel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get channel by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    res.status(200).json({ channel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update channel by id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedBy = req.user.userId;

    // Find channel by ID
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    // Check if "owner" of the channel
    if (channel.created_by.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this channel' });
    }
    // Update channel properties
    if (name) {
      channel.name = name;
    }
    if (description) {
      channel.description = description;
    }


    // Save updated channel to database
    await channel.save();

    // Return success response
    res.status(200).json({ message: 'Channel updated', channel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    // Check if "owner" of the channel
    if (channel.created_by.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this channel' });
    }
    await channel.deleteOne();
    res.status(200).json({ message: 'Channel deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;