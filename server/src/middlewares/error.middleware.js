const appConfig = require('../config/app.config');

/**
 * 404 Not Found এরর হ্যান্ডলার।
 * যখন কোনো রাউট মেলে না, তখন এই মিডলওয়্যারটি কাজ করে।
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // এররটিকে পরবর্তী এরর হ্যান্ডলারে পাঠানো হচ্ছে
};

/**
 * গ্লোবাল এরর হ্যান্ডলার।
 * অ্যাপ্লিকেশনের যেকোনো এরর এখানে এসে শেষ হয়।
 */
const errorHandler = (err, req, res, next) => {
  // যদি কোনো কারণে স্ট্যাটাস কোড 200 থাকে (যা সাধারণত এরর নয়),
  // তাহলে তাকে 500 (Internal Server Error) করে দেওয়া হচ্ছে।
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message,
    // প্রোডাকশন মোডে এররের বিস্তারিত তথ্য (stack trace) দেখানো হবে না
    stack: appConfig.nodeEnv === 'production' ? '🥞' : err.stack,
  });
};

module.exports = { notFound, errorHandler };
