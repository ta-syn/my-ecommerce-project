const Order = require('../models/order.model');

/**
 * একটি নতুন অর্ডার তৈরি করে।
 * @param {string} userId - ব্যবহারকারীর আইডি।
 * @param {object} orderData - অর্ডারের বিস্তারিত তথ্য।
 * @returns {Promise<Order>}
 */
const createOrder = async (userId, orderData) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new Error('No order items');
  }

  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  return await order.save();
};

/**
 * নির্দিষ্ট ব্যবহারকারীর সমস্ত অর্ডার খুঁজে বের করে।
 * @param {string} userId
 * @returns {Promise<Order[]>}
 */
const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId }).populate('user', 'name email');
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
