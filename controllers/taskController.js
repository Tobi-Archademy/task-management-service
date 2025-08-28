const Task = require("../models/Task");
const mongoose = require("mongoose");
const { sendSuccess, sendError } = require('../utils/helpers');

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || 'PENDING',
      userId: req.user._id
    });

    return sendSuccess(res, { task }, 'Task created successfully', 200);
  } catch (error) {
    console.error('Create task error:', error);
    return sendError(res, 500, 'Server error creating task');
  }
};

const getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { userId: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const tasks = await Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10));
    const total = await Task.countDocuments(filter);

    return sendSuccess(res, {
      tasks,
      pagination: {
        current: parseInt(page, 10),
        pages: Math.ceil(total / parseInt(limit, 10)),
        total,
        limit: parseInt(limit, 10)
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return sendError(res, 500, 'Server error fetching tasks');
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return sendError(res, 400, 'Invalid task ID');

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) return sendError(res, 404, 'Task not found');

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    return sendSuccess(res, { task: updatedTask }, 'Task updated successfully');
  } catch (error) {
    console.error('Update task error:', error);
    return sendError(res, 500, 'Server error updating task');
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return sendError(res, 400, 'Invalid task ID');

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) return sendError(res, 404, 'Task not found');

    await Task.findByIdAndDelete(id);
    return sendSuccess(res, {}, 'Task deleted successfully');
  } catch (error) {
    console.error('Delete task error:', error);
    return sendError(res, 500, 'Server error deleting task');
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
