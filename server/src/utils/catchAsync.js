// server/src/utils/catchAsync.js

/**
 * এটি একটি হাই-অর্ডার ফাংশন যা async কন্ট্রোলার ফাংশনগুলোকে র‍্যাপ করে।
 * এটি যেকোনো এররকে ধরে সেটিকে next() এর মাধ্যমে গ্লোবাল এরর হ্যান্ডেলারের কাছে পাঠিয়ে দেয়।
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
