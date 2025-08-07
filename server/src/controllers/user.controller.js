// server/src/controllers/user.controller.js
const userService = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');

// প্রতিটি কন্ট্রোলার ফাংশনকে আলাদাভাবে তৈরি করা হচ্ছে
const registerUser = catchAsync(async (req, res) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please login.',
    data: user,
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
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: req.user,
  });
});

// CHANGE: module.exports কে একটি অবজেক্ট হিসেবে এক্সপোর্ট করা হচ্ছে
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
