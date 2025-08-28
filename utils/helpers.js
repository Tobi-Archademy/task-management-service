const sendSuccess = (res, data = {}, message = 'Success', status = 200) => {
  return res.status(status).json({ success: true, message, data });
};

const sendError = (res, status = 500, message = 'Internal server error', errors = null) => {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(status).json(payload);
};

module.exports = { sendSuccess, sendError };