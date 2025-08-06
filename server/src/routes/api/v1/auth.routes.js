const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../../../controllers/user.controller');
const validate = require('../../../middlewares/validation.middleware'); // <-- ইম্পোর্ট করুন
const {
  registerValidation,
  loginValidation,
} = require('../../../validations/user.validation'); // <-- ইম্পোর্ট করুন

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, validate, registerUser); // <-- এখানে যুক্ত করুন

// @route   POST /api/v1/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', loginValidation, validate, loginUser); // <-- এখানে যুক্ত করুন

module.exports = router;
