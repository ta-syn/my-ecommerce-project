const express = require('express');
const {
  createOrder,
  getMyOrders,
} = require('../../../controllers/order.controller');
const { protect } = require('../../../middlewares/auth.middleware');

const router = express.Router();

// @route   POST /api/v1/orders
// @desc    Create a new order
// @access  Private (শুধুমাত্র লগইন করা ব্যবহারকারীরা)
router.post('/', protect, createOrder);

// @route   GET /api/v1/orders/my-orders
// @desc    Get logged in user's orders
// @access  Private
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
