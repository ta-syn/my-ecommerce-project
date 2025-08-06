import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/_AuthPages.scss';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে API কল করে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানোর ব্যবস্থা করা হবে
    setMessage(`If an account with email ${email} exists, a password reset link has been sent.`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Reset Your Password</h1>
        <p className="auth-subtitle">Enter your email address and we will send you a link to reset your password.</p>
        {message ? (
          <p className="success-message">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">Send Reset Link</button>
          </form>
        )}
        <div className="auth-footer">
          <p>
            Remember your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;