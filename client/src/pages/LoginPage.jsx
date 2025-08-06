import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // আমাদের কাস্টম Auth হুক
import authApi from '../services/authApi'; // আমাদের Auth API সার্ভিস
import '../styles/pages/_AuthPages.scss'; // কমন স্টাইল

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // AuthContext থেকে login ফাংশনটি নেওয়া হচ্ছে
  const navigate = useNavigate();
  const location = useLocation();

  // ব্যবহারকারীকে কোন পেজ থেকে লগইন পেজে পাঠানো হয়েছে, তা ট্র্যাক করা হচ্ছে
  const from = location.state?.from?.pathname || '/customer-dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // authApi সার্ভিস ব্যবহার করে ব্যাকএন্ডে লগইন রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await authApi.login({ email, password });

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // AuthContext-এর login ফাংশনকে কল করে ব্যবহারকারীর তথ্য এবং টোকেন সেভ করা হচ্ছে
        login(user, token);
        
        // ব্যবহারকারীকে আগের পেজে অথবা ড্যাশবোর্ডে পাঠানো হচ্ছে
        navigate(from, { replace: true });
      }
    } catch (err) {
      // API থেকে আসা এরর মেসেজ দেখানো হচ্ছে
      const errorMessage = err.response?.data?.message || 'Failed to log in. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Login to Spondonhub</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading} // লোডিং অবস্থায় ইনপুট ডিজেবল করা হচ্ছে
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            <Link to="/reset-password">Forgot Password?</Link>
          </p>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;