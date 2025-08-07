// server/src/services/user.service.js
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError'); // ApiError ইম্পোর্ট করা হচ্ছে
const httpStatus = require('http-status');   // http-status ইম্পোর্ট করা হচ্ছে
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const registerUser = async (userData) => {
  const { email } = userData;
  if (await User.findOne({ email })) {
    // THIS IS THE FIX: Throwing a specific ApiError with 400 status code
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = new User(userData);
  await user.save();
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  const payload = { id: user._id, name: user.name };
  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  const userResponse = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
  return { user: userResponse, token };
};

module.exports = {
  registerUser,
  loginUser,
};
