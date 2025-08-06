const userService = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please login.',
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await userService.loginUser(email, password);
  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: { user, token },
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  // auth.middleware থেকে req.user অবজেক্টটি ব্যবহার করা হচ্ছে
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: req.user, // ডেটাবেস থেকে পাওয়া আসল ইউজার ডেটা
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
