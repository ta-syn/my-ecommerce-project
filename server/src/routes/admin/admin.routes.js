const express = require('express');
const {
  getAllUsers,
  getAllOrders,
} = require('../../../controllers/admin.controller');
const { protect, admin } = require('../../../middlewares/auth.middleware');

const router = express.Router();

// এই ফাইলের সকল রাউটের আগে protect এবং admin মিডলওয়্যারটি ব্যবহার করা যেতে পারে
// router.use(protect, admin);

// @route   GET /api/admin/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/users', protect, admin, getAllUsers);

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/orders', protect, admin, getAllOrders);

// এখানে পণ্য যোগ, আপডেট, ডিলেট করার রাউটগুলোও রাখা যায়
// যেমন:
// router.put('/products/:id', protect, admin, updateProduct);
// router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;
