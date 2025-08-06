import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../services/authApi'; // Auth API সার্ভিস
import { isPasswordStrong, isValidEmail } from '../utils/validators'; // আমাদের ভ্যালিডেটর
import '../styles/pages/_AuthPages.scss'; // কমন স্টাইল

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- ফ্রন্টএন্ড ভ্যালিডেশন ---
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isPasswordStrong(password, 6)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // -------------------------

    setLoading(true);

    try {
      // authApi সার্ভিস ব্যবহার করে ব্যাকএন্ডে রেজিস্টার রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await authApi.register({ name, email, password });

      if (response.data.success) {
        // রেজিস্টার সফল হলে ব্যবহারকারীকে একটি বার্তা দেখানো যেতে পারে
        alert('Registration successful! Please proceed to login.');
        // ব্যবহারকারীকে লগইন পেজে পাঠানো হচ্ছে
        navigate('/login');
      }
    } catch (err) {
      // API থেকে আসা এরর মেসেজ দেখানো হচ্ছে
      const errorMessage = err.response?.data?.message || 'Failed to register. An account with this email may already exist.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;