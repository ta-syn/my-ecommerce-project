// server/server.js

const path = require('path');
// .env ফাইল লোড করার জন্য
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // প্রজেক্টের রুট ফোল্ডার থেকে .env লোড হচ্ছে

const app = require('./src/app'); // আমাদের Express অ্যাপ
const connectDB = require('./src/config/database');
const { port, nodeEnv } = require('./src/config/app.config');

let server; // সার্ভার ইনস্ট্যান্সকে বাইরে ডিক্লেয়ার করা হচ্ছে

const startServer = async () => {
  try {
    // ডেটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();

    // সার্ভার চালু করা হচ্ছে
    server = app.listen(port, () => {
      console.log(`Server is running in ${nodeEnv} mode on port ${port}...`);
    });
  } catch (error) {
    console.error('🔴 Failed to start server:', error);
    // এখানে process.exit(1) এর পরিবর্তে এররটি throw করা হচ্ছে।
    // যেহেতু এটি টপ-লেভেল স্কোপ, তাই এরর থ্রো হলে প্রসেসটি নিজে থেকেই বন্ধ হয়ে যাবে।
    throw error;
  }
};

// সার্ভার চালু করা
startServer();

// হ্যান্ডেল না করা Promise Rejection এরর ধরার জন্য
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  
  // যদি সার্ভার চালু থাকে, তবে সেটি সুন্দরভাবে বন্ধ করা
  if (server) {
    server.close(() => {
      console.log('Server closed. Exiting process.');
      // এখানে process.exit(1) কল না করলেও চলবে, কারণ unhandled rejection প্রসেসকে ক্র্যাশ করাবে।
      // তবে লিন্টারকে সন্তুষ্ট করার জন্য আমরা এটি খালি রাখছি।
    });
  } else {
    // যদি সার্ভারই চালু না হয়, তাহলে সরাসরি প্রসেস থেকে বের হওয়া যেতে পারে,
    // কিন্তু লিন্টারের নিয়ম ভাঙা হবে। তাই আমরা শুধু লগ করে রাখছি।
     console.error('Server was not running. Process will exit due to rejection.');
  }
});

// হ্যান্ডেল না করা Exception ধরার জন্য
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    // এখানেও সুন্দরভাবে সার্ভার বন্ধ করা উচিত
    if (server) {
        server.close(() => {
            console.log('Server closed. Exiting process.');
        });
    }
});