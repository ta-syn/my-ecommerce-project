const productService = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createProduct = catchAsync(async (req, res) => {
  // user আইডি auth.middleware থেকে আসবে
  req.body.user = req.user.id;
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await productService.queryProducts(req.query);
  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};