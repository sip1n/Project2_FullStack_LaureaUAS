const User = require('../models/user');

exports.users = async (req, res) => {
  try {
    const { email, password, channels } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = new User({ email, password, channels });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ message: 'User created', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
