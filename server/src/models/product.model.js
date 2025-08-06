const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // 'User' মডেলের সাথে সম্পর্ক স্থাপন
    },
  },
  {
    timestamps: true, // পর্যালোচনার সময়কাল যুক্ত করবে
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // কোন অ্যাডমিন পণ্যটি যোগ করেছে তার রেফারেন্স
    },
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required.'],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    reviews: [reviewSchema], // এখানে রিভিউ স্কিমাটি নেস্ট করা হয়েছে
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Product stock count is required.'],
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt ফিল্ড স্বয়ংক্রিয়ভাবে যুক্ত করবে
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
