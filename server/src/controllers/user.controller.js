// server/src/controllers/user.controller.js
const userService = require('../services/user.service');

const registerUser = async (req, res) => {
  const result = await userService.registerUser(req.body);

  // THIS IS THE FINAL FIX: We check if the service returned an error object
  if (result.error) {
    return res.status(result.statusCode).json({
      success: false,
      message: result.message,
    });
  }

  // If no error, send success response
  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please login.',
    data: result,
  });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    if (result.error) {
        return res.status(result.statusCode).json({
            success: false,
            message: result.message,
        });
    }

    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        data: result,
    });
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