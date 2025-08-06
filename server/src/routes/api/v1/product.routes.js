const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct, // অ্যাডমিন রাউটে সরানো যেতে পারে
} = require('../../../controllers/product.controller');
const { protect, admin } = require('../../../middlewares/auth.middleware');

const router = express.Router();

// @route   GET /api/v1/products
// @desc    Fetch all products
// @access  Public
router.get('/', getProducts);

// @route   GET /api/v1/products/:id
// @desc    Fetch a single product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/v1/products
// @desc    Create a new product (Admin only)
// @access  Private/Admin
// এই রাউটটি admin.routes.js ফাইলে রাখাই ভালো, তবে এখানেও রাখা যায়।
router.post('/', protect, admin, createProduct);

module.exports = router;
