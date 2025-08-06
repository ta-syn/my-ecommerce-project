const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true, // প্রতিটি ইমেইল স্বতন্ত্র হতে হবে
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // ডিফল্টভাবে কোনো ব্যবহারকারী অ্যাডমিন নয়
    },
  },
  {
    timestamps: true,
  }
);

// পাসওয়ার্ড ম্যাচ করার জন্য একটি মেথড তৈরি করা হচ্ছে
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ডেটাবেসে সেভ করার আগে পাসওয়ার্ড হ্যাশ করার জন্য একটি প্রি-সেভ হুক
userSchema.pre('save', async function (next) {
  // যদি পাসওয়ার্ড ফিল্ডটি পরিবর্তন না হয়, তবে পরবর্তী ধাপে যাবে
  if (!this.isModified('password')) {
    next();
  }

  // পাসওয়ার্ড হ্যাশ করা হচ্ছে
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
