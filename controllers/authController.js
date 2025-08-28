const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendSuccess, sendError } = require('../utils/helpers');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(res, 400, 'User already exists with this email');

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return sendSuccess(res,
      {
        user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
        token,
        refreshToken
      },
      'User registered successfully',
      200
    );
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 11000) return sendError(res, 400, 'Email already in use');
    return sendError(res, 500, 'Server error during registration');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return sendError(res, 401, 'Invalid credentials');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return sendError(res, 401, 'Invalid credentials');

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return sendSuccess(res,
      {
        user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
        token,
        refreshToken
      },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    return sendError(res, 500, 'Server error during login');
  }
};

module.exports = {
  register,
  login,
};
