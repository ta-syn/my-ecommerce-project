// server/src/services/user.service.js
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const registerUser = async (userData) => {
  const { email } = userData;
  if (await User.findOne({ email })) {
    // THIS IS THE FINAL FIX: Instead of throwing, we return an error object
    return {
      error: true,
      message: 'Email already exists',
      statusCode: 400,
    };
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
        return {
            error: true,
            message: 'Invalid email or password',
            statusCode: 401,
        };
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
