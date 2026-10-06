const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protects routes: requires header "Authorization: Bearer <token>"
const protect = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized: token missing' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Not authorized: user no longer exists' });
    }

    req.user = user; // available in every controller after this middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized: token invalid or expired' });
  }
};

module.exports = { protect };
