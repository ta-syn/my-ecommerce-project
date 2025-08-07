// server/src/middlewares/error.middleware.js
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const appConfig = require('../config/app.config');

const errorConverter = (err, req, res, next) => {
  let error = err;
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
