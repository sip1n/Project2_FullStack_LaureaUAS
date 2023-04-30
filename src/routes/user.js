const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/user');

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
