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
    // সার্ভার চালু হতে ব্যর্থ হলে প্রসেস থেকে বের হয়ে যাবে
    process.exit(1);
  }
};

module.exports = connectDB;
