// server/src/services/user.service.js

const User = require('../models/user.model');
const ApiError = require('../utils/ApiError'); // ApiError ইম্পোর্ট করা হচ্ছে
const httpStatus = require('http-status'); // http-status ইম্পোর্ট করা হচ্ছে
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

/**
 * একজন নতুন ব্যবহারকারীকে রেজিস্টার করে।
 * @param {object} userData - { name, email, password }
 * @returns {Promise<User>}
 */
const registerUser = async (userData) => {
  const { email } = userData;
  // FIX: Check if email is already taken using the model's static method if it exists, otherwise a direct findOne.
  if (await User.findOne({ email })) {
    // THIS IS THE FIX: Throwing a specific ApiError with 400 status code
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  }
  const user = new User(userData);
  await user.save();
  // Returning user without password
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};

/**
 * একজন ব্যবহারকারীকে লগইন করে এবং টোকেন তৈরি করে।
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object, token: string}>}
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  // FIX: Assuming your user model has a method `matchPassword`
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  const payload = { id: user._id, name: user.name };
  const token = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return { user: userResponse, token };
};

module.exports = {
  registerUser,
  loginUser,
};
