// server/src/utils/ApiError.js

class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP স্ট্যাটাস কোড।
   * @param {string} message - এররের বর্ণনা।
   * @param {boolean} isOperational - এটি একটি অপারেশনাল এরর কিনা (যেমন ভুল ইনপুট), নাকি একটি প্রোগ্রামিং এরর।
   * @param {string} stack - এররের স্ট্যাক ট্রেস।
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
