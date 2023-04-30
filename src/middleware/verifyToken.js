const jwt = require('jsonwebtoken');
// Function to verify JWT token 
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }
  try {
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
