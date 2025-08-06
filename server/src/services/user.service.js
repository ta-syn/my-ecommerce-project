const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

/**
 * একজন নতুন ব্যবহারকারীকে রেজিস্টার করে।
 * @param {object} userData - { name, email, password }
 * @returns {Promise<User>}
 */
const registerUser = async (userData) => {
  const { email } = userData;
  if (await User.findOne({ email })) {
    throw new Error('Email already exists');
  }
  const user = new User(userData);
  return await user.save();
};

/**
 * একজন ব্যবহারকারীকে লগইন করে এবং টোকেন তৈরি করে।
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object, token: string}>}
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid email or password');
  }

  const payload = { id: user._id, name: user.name };
  const token = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  // পাসওয়ার্ড ছাড়া ব্যবহারকারীর তথ্য ফেরত পাঠানো হচ্ছে
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
