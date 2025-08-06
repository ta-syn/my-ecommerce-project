import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // AuthContext ডেটা লোড হওয়ার জন্য অপেক্ষা করা হচ্ছে
  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  // যদি ব্যবহারকারী লগইন করা না থাকেন
  if (!isAuthenticated) {
    // তাকে লগইন পেজে পাঠিয়ে দেওয়া হবে
    // `state` অবজেক্টের মাধ্যমে ব্যবহারকারী কোন পেজে যেতে চেয়েছিলেন, তা মনে রাখা হচ্ছে
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // যদি ব্যবহারকারী লগইন করা থাকেন, তাহলে তাকে অনুরোধ করা পেজটি দেখানো হবে
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;