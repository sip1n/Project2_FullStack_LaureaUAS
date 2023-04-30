const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }
  try {
    console.log('Token:', token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verification successful');
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken;
