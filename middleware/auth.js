const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/helpers');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return sendError(res, 401, 'Access denied. No token provided.');

    const token = authHeader.replace(/^Bearer\s+/i, '');
    if (!token) return sendError(res, 401, 'Access denied. No token provided.');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('_id name email createdAt');
    if (!user) return sendError(res, 401, 'Token is not valid. User not found.');

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') return sendError(res, 401, 'Token has expired');
    console.error('Auth middleware error:', error);
    return sendError(res, 401, 'Token is not valid.');
  }
};

module.exports = auth;