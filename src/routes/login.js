const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists with given email
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with stored hashed (bcrypt) password
    const passwordsMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    console.log(`Generated token: ${token}`);

    // Return success response
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;