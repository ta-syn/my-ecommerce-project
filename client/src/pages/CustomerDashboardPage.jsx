import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import orderApi from '../services/orderApi'; // Order API সার্ভিস
import { formatDate } from '../utils/helpers'; // আমাদের সহায়ক ফাংশন
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/_CustomerDashboardPage.scss';

const CustomerDashboardPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // কোন ট্যাব সক্রিয় আছে

  // যদি ব্যবহারকারী লগইন করা না থাকে, তাকে লগইন পেজে পাঠিয়ে দেওয়া হবে
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/customer-dashboard' } } });
    }
  }, [isAuthenticated, navigate]);

  // ব্যবহারকারীর অর্ডারগুলো আনার জন্য useEffect
  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await orderApi.getMyOrders();
          setOrders(response.data.data);
        } catch (err) {
          setError('Failed to fetch your orders.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated]); // isAuthenticated পরিবর্তন হলে চলবে

  const handleLogout = () => {
    logout();
    navigate('/'); // লগআউট করে হোমপেজে পাঠিয়ে দেওয়া হবে
  };

  if (!user) {
    // এই অবস্থাটি খুব অল্প সময়ের জন্য দেখা যেতে পারে, যখন AuthContext লোড হচ্ছে
    return <div className="loading-message">Loading user data...</div>;
  }
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <section id="profile" className="content-section">
            <h2>Profile Information</h2>
            <div className="profile-details">
              <p><strong>Full Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button className="edit-button">Edit Profile</button>
            </div>
          </section>
        );
      case 'orders':
        return (
          <section id="orders" className="content-section">
            <h2>Order History</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <div className="order-list">
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order._id} className="order-item">
                      <p><strong>Order ID:</strong> {order._id}</p>
                      <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                      <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                      <p><strong>Status:</strong> {order.isDelivered ? 'Delivered' : 'Processing'}</p>
                    </div>
                  ))
                ) : (
                  <p>You have no orders yet. <Link to="/products">Start shopping!</Link></p>
                )}
              </div>
            )}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Welcome, {user.name}!</h1>
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button onClick={() => setActiveTab('profile')} className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
              Profile Information
            </button>
            <button onClick={() => setActiveTab('orders')} className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}>
              Order History
            </button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </nav>
        </aside>
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;