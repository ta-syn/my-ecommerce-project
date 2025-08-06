import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/pages/_OrderConfirmationPage.scss'; // স্টাইল পরে যোগ হবে

const OrderConfirmationPage = () => {
  // useLocation হুক ব্যবহার করে Checkout পেজ থেকে ডেটা পাস করা যেতে পারে
  const location = useLocation();
  const orderId = location.state?.orderId || 'SPON-12345XYZ'; // উদাহরণ ডেটা

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-box">
        <div className="success-icon">✓</div>
        <h1 className="confirmation-title">Thank You For Your Order!</h1>
        <p className="confirmation-message">
          Your order has been placed successfully. A confirmation email has been sent to you.
        </p>
        <p className="order-id">
          Your Order ID: <strong>{orderId}</strong>
        </p>
        <div className="confirmation-actions">
          <Link to="/products" className="action-button">
            Continue Shopping
          </Link>
          <Link to="/customer-dashboard" className="action-button secondary">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;