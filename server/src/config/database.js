const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'FATAL ERROR: MONGODB_URI is not defined in the environment variables.'
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // CHANGE: process.exit(1) এর পরিবর্তে error টি throw করা হচ্ছে। 
    // এটি server.js এ ধরা পড়বে এবং প্রসেস বন্ধ করবে।
    throw error;
  }
};

module.exports = connectDB;
