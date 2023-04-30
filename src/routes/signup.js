const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/', async (req, res) => {
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

module.exports = router;


/* const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/', async (req, res) => {
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

module.exports = router; */