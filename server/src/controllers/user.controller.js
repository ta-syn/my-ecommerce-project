// server/src/controllers/user.controller.js
const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError'); // ApiError ইম্পোর্ট করা হচ্ছে
const httpStatus = require('http-status');   // http-status ইম্পোর্ট করা হচ্ছে

// প্রতিটি কন্ট্রোলার ফাংশনকে আলাদাভাবে তৈরি করা হচ্ছে
const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please login.',
      data: user,
    });
  } catch (error) {
    // THIS IS THE FINAL FIX: Catching the error directly and sending the correct status code
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    // For any other unexpected error
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: { user, token },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
    });
  }
};

const getUserProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};