const express = require('express');
const cors = require('cors');
const { corsOrigin } = require('./config/app.config');

// মিডলওয়্যার ইম্পোর্ট
const { notFound, errorHandler } = require('./middlewares/error.middleware');

// রাউট ইম্পোর্ট
const authRoutes = require('./routes/api/v1/auth.routes');
const productRoutes = require('./routes/api/v1/product.routes');
const orderRoutes = require('./routes/api/v1/order.routes');
const adminRoutes = require('./routes/admin/admin.routes');

// Express অ্যাপ ইনিশিয়ালাইজেশন
const app = express();

// --- কোর মিডলওয়্যার ---

// CORS (Cross-Origin Resource Sharing) সেটআপ
app.use(cors({
  origin: corsOrigin, // .env ফাইল থেকে আসা URL-কে অনুমতি দেবে
}));

// ইনকামিং JSON রিকোয়েস্ট পার্স করার জন্য
app.use(express.json());

// ইনকামিং URL-encoded রিকোয়েস্ট পার্স করার জন্য
app.use(express.urlencoded({ extended: true }));


// --- API রাউটস ---

// একটি সাধারণ Health Check রুট, যা দেখাবে সার্ভার চালু আছে কিনা
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Spondonhub API! Server is up and running.',
  });
});

// v1 API রাউটগুলো ব্যবহার করা হচ্ছে
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// অ্যাডমিন রাউট ব্যবহার করা হচ্ছে
app.use('/api/admin', adminRoutes);


// --- এরর হ্যান্ডলিং মিডলওয়্যার ---
// এই মিডলওয়্যারগুলো সব রাউটের শেষে থাকতে হবে, যাতে তারা সমস্ত এরর ধরতে পারে

// 404 Not Found হ্যান্ডলার
app.use(notFound);

// গ্লোবাল এরর হ্যান্ডলার
app.use(errorHandler);

// অ্যাপটি এক্সপোর্ট করা হচ্ছে, যা server.js ফাইলে ব্যবহার হবে
module.exports = app;
