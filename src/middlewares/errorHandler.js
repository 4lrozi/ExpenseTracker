// middleware/errorHandler.js
const AppError = require('../utils/appError');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Set defaults if not provided
  statusCode = statusCode || 500;
  message = message || 'Internal Server Error';

  // Handle specific errors (e.g., MongoDB, Validation errors)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((el) => el.message).join(', ');
  }

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

module.exports = errorHandler;
