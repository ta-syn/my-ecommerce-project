import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 1. কনটেক্সট তৈরি করা
const AuthContext = createContext(null);

// 2. AuthProvider কম্পোনেন্ট তৈরি করা
// এই কম্পোনেন্টটি পুরো অ্যাপকে র‍্যাপ করবে এবং অথেন্টিকেশন স্টেট ম্যানেজ করবে
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('spondonhub_token'));
  const [loading, setLoading] = useState(true);

  // অ্যাপ লোড হওয়ার সময় localStorage থেকে টোকেন এবং ব্যবহারকারীর তথ্য চেক করবে
  useEffect(() => {
    if (token) {
      // বাস্তব প্রকল্পে, এখানে টোকেনের বৈধতা যাচাই করার জন্য সার্ভারে একটি API কল করা উচিত
      // যেমন: fetch('/api/v1/users/profile', { headers: { Authorization: `Bearer ${token}` }})
      // আপাতত আমরা localStorage থেকে ব্যবহারকারীর ডেটা নিচ্ছি
      const storedUser = localStorage.getItem('spondonhub_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false); // চেকিং শেষ, লোডিং বন্ধ
  }, [token]);

  // লগইন করার ফাংশন
  const login = (userData, authToken) => {
    localStorage.setItem('spondonhub_user', JSON.stringify(userData));
    localStorage.setItem('spondonhub_token', authToken);
    setUser(userData);
    setToken(authToken);
  };

  // লগআউট করার ফাংশন
  const logout = () => {
    localStorage.removeItem('spondonhub_user');
    localStorage.removeItem('spondonhub_token');
    setUser(null);
    setToken(null);
  };

  // কনটেক্সটের মাধ্যমে এই ভ্যালুগুলো সরবরাহ করা হবে
  const value = {
    user,
    token,
    isAuthenticated: !!token, // টোকেন থাকলেই ব্যবহারকারী অথেন্টিকেটেড
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;