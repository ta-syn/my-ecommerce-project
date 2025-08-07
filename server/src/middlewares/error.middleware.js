// server/src/middlewares/error.middleware.js
const appConfig = require('../config/app.config');
const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) => {
  // Create a specific ApiError for 404
  next(new ApiError(404, `Not Found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // If the error is not an ApiError, convert it to one
  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  
  // Ensure statusCode is set
  res.status(statusCode || 500);

  res.json({
    success: false,
    message: message,
    stack: appConfig.nodeEnv === 'production' ? '🥞' : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
