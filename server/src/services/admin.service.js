// server/src/services/admin.service.js

const User = require('../models/user.model');
const Order = require('../models/order.model');

/**
 * Get all users from the database
 * @returns {Promise<Array>}
 */
const getAllUsers = async () => {
  // password বাদ দিয়ে সব ইউজারকে খুঁজে বের করা হচ্ছে
  const users = await User.find().select('-password');
  return users;
};

/**
 * Get all orders from the database
 * @returns {Promise<Array>}
 */
const getAllOrders = async () => {
  // ইউজার এবং প্রোডাক্টের তথ্যসহ সব অর্ডার খুঁজে বের করা হচ্ছে
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('items.product', 'name price');
  return orders;
};

module.exports = {
  getAllUsers,
  getAllOrders,
};