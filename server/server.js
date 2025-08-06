// server/server.js

const path = require('path');
// .env ফাইল লোড করার জন্য
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // প্রজেক্টের রুট ফোল্ডার থেকে .env লোড হচ্ছে

const app = require('./src/app'); // আমাদের Express অ্যাপ
const connectDB = require('./src/config/database');
const { port, nodeEnv } = require('./src/config/app.config');

const startServer = async () => {
  try {
    // ডেটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();

    // সার্ভার চালু করা হচ্ছে
    const server = app.listen(port, () => {
      console.log(`Server is running in ${nodeEnv} mode on port ${port}...`);
    });

    // হ্যান্ডেল না করা Promise Rejection এরর ধরার জন্য
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...');
      console.error(err.name, err.message);
      // সার্ভার বন্ধ করে অ্যাপ্লিকেশন থেকে বের হয়ে যাবে
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();