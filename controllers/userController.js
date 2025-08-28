const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/helpers');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('name email createdAt');
    if (!user) return sendError(res, 404, 'User not found');

    return sendSuccess(res, { user }, 'Profile fetched successfully');
  } catch (error) {
    console.error('Get profile error:', error);
    return sendError(res, 500, 'Server error fetching profile');
  }
};

const searchUsers = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return sendError(res, 400, 'Name parameter is required');

    const users = await User.find({ name: { $regex: name, $options: 'i' } }).select('name email createdAt');

    return sendSuccess(res, { users, count: users.length }, 'Users fetched');
  } catch (error) {
    console.error('Search users error:', error);
    return sendError(res, 500, 'Server error searching users');
  }
};

module.exports = {
  getUserProfile,
  searchUsers
};