// server/src/middlewares/error.middleware.js

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const appConfig = require('../config/app.config');

const errorConverter = (err, req, res, next) => {
  let error = err;

  // MongoDB duplicate key error (error code 11000) হ্যান্ডেল করার জন্য
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const message = `The ${field} '${error.keyValue[field]}' is already in use.`;
    error = new ApiError(httpStatus.BAD_REQUEST, message, false, err.stack);
  }

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).json({
    success: false,
    message,
    ...(appConfig.nodeEnv === 'development' && { stack: err.stack }),
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};
