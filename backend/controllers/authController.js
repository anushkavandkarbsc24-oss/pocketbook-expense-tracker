const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const emailPattern = /^\S+@\S+\.\S+$/;

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const userResponse = (user) => ({ id: user._id, name: user.name, email: user.email });

// POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ message: 'Name is required' });
    if (!email || !emailPattern.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: 'An account with this email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ token: generateToken(user._id), user: userResponse(user) });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    const matches = user && (await bcrypt.compare(password, user.password));
    if (!matches) return res.status(401).json({ message: 'Incorrect email or password' });

    res.json({ token: generateToken(user._id), user: userResponse(user) });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me  (protected) - lets the frontend check a stored token
const getMe = (req, res) => {
  res.json({ user: userResponse(req.user) });
};

module.exports = { signup, login, getMe };
