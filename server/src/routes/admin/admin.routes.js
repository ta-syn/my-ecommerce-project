// server/src/routes/admin/admin.routes.js

const express = require('express');
const router = express.Router();

// --- START: CORRECT IMPORTS (THIS IS THE FINAL FIX) ---
// Controller-কে সঠিক পাথ থেকে ইম্পোর্ট করা হচ্ছে
const {
  getAllUsers,
  getAllOrders,
} = require('../../controllers/admin.controller');

// Middleware-কে সঠিক পাথ থেকে ইম্পোর্ট করা হচ্ছে
const { protect, admin } = require('../../middlewares/auth.middleware');
// --- END: CORRECT IMPORTS ---


// @route   GET /api/v1/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/users', protect, admin, getAllUsers);


// @route   GET /api/v1/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/orders', protect, admin, getAllOrders);


module.exports = router;
