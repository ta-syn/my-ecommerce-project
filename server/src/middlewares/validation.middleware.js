const { validationResult } = require('express-validator');

/**
 * এটি একটি মিডলওয়্যার যা express-validator দ্বারা তৈরি করা এররগুলো পরিচালনা করে।
 * যদি কোনো ভ্যালিডেশন এরর থাকে, তবে এটি 400 Bad Request রেসপন্স পাঠাবে।
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // কোনো এরর না থাকলে পরবর্তী ধাপে যাবে
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = validate;
