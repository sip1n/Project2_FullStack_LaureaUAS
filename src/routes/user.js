const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/userModel');


// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists with given email
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    // Hash password before storing it in database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user with given email and hashed password
    const newUser = new User({ email, password: hashedPassword });
    
    // Save new user to database
    await newUser.save();
    
    // Return success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
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
      
      
      // Set cookie with JWT token
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });
      

    console.log('JWT token generated');

    // Return success response
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User info
router.get('/me', verifyToken, async (req, res) => {
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
