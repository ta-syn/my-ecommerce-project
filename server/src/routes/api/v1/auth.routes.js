// server/src/routes/api/v1/auth.routes.js

const express = require('express');
const router = express.Router();

// --- START: CORRECT IMPORTS (THIS IS THE FINAL FIX) ---
// Controller-কে সঠিক পাথ থেকে ইম্পোর্ট করা হচ্ছে
const {
  registerUser,
  loginUser,
} = require('../../../controllers/user.controller');

// Validation Middleware-কে সঠিক পাথ থেকে ইম্পোর্ট করা হচ্ছে
const validate = require('../../../middlewares/validation.middleware');

// Validation Schema-কে সঠিক পাথ থেকে ইম্পোর্ট করা হচ্ছে
const {
  registerValidation,
  loginValidation,
} = require('../../../validations/user.validation');
// --- END: CORRECT IMPORTS ---


// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, validate, registerUser);


// @route   POST /api/v1/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', loginValidation, validate, loginUser);


module.exports = router;
