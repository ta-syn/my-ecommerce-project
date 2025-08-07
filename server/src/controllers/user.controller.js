// server/src/controllers/user.controller.js
const userService = require('../services/user.service');

const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please login.',
      data: user,
    });
  } catch (error) {
    // THIS IS THE FINAL AND GUARANTEED FIX:
    // We will check the error message directly instead of the status code.
    if (error.message === 'Email already exists') {
      return res.status(400).json({ // Directly sending 400
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: { user, token },
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
        return res.status(401).json({ // Directly sending 401
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