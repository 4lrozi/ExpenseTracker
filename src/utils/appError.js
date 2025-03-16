class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // To distinguish between operational errors and programming errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;