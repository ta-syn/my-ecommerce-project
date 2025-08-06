const Product = require('../models/product.model');

/**
 * একটি নতুন পণ্য তৈরি করে।
 * @param {object} productData - পণ্য তৈরির জন্য প্রয়োজনীয় ডেটা।
 * @returns {Promise<Product>}
 */
const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

/**
 * ফিল্টার এবং পেজিনেশনসহ সমস্ত পণ্য খুঁজে বের করে।
 * @param {object} queryOptions - পেজ, লিমিট, ক্যাটাগরি ইত্যাদি।
 * @returns {Promise<object>} - products and pagination info.
 */
const queryProducts = async (queryOptions) => {
  const { page = 1, limit = 10, category } = queryOptions;
  const filter = category ? { category } : {};

  const products = await Product.find(filter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Product.countDocuments(filter);

  return {
    products,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

/**
 * আইডি দিয়ে একটি নির্দিষ্ট পণ্য খুঁজে বের করে।
 * @param {string} productId
 * @returns {Promise<Product>}
 */
const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

// ... এখানে পণ্য আপডেট, ডিলেট এবং রিভিউ যোগ করার সার্ভিস ফাংশনও থাকবে

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
};
