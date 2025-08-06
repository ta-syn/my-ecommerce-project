const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.js');
// const User = require('../models/user.model'); // পরে User মডেল ইম্পোর্ট করতে হবে

const protect = async (req, res, next) => {
  let token;

  // হেডার থেকে 'Authorization' টোকেন চেক করা হচ্ছে (ফরম্যাট: "Bearer <token>")
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // টোকেনটি বের করে আনা হচ্ছে ("Bearer " অংশটি বাদ দিয়ে)
      token = req.headers.authorization.split(' ')[1];

      // টোকেনটি ভেরিফাই করা হচ্ছে
      const decoded = jwt.verify(token, secret);

      // ডিকোড করা আইডি দিয়ে ডেটাবেস থেকে ব্যবহারকারীকে খুঁজে বের করা হচ্ছে
      // এবং পাসওয়ার্ড ছাড়া বাকি তথ্য req.user-এ সেট করা হচ্ছে
      // req.user = await User.findById(decoded.id).select('-password');

      // --- আপাতত স্যাম্পল ইউজার ডেটা ---
      req.user = { id: decoded.id, name: 'Sample User' };
      // --------------------------------

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: 'User not found.' });
      }

      next(); // সব ঠিক থাকলে পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে যাবে
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, no token.' });
  }
};

// এই মিডলওয়্যারটি ব্যবহারকারী অ্যাডমিন কিনা তা যাচাই করবে
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // User মডেলে 'isAdmin' নামে একটি ফিল্ড থাকতে হবে
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: 'Not authorized as an admin.' });
  }
};

module.exports = { protect, admin };
