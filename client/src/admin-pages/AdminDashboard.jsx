import React from 'react';
import { FaDollarSign, FaShoppingCart, FaUsers, FaBoxOpen } from 'react-icons/fa';
import './AdminDashboard.css'; // স্টাইল পরে যোগ হবে

// StatCard নামে একটি ছোট কম্পোনেন্ট তৈরি করা হলো ড্যাশবোর্ডের জন্য
const StatCard = ({ icon, title, value, color }) => (
  <div className="stat-card" style={{ borderLeftColor: color }}>
    <div className="stat-icon" style={{ backgroundColor: color }}>{icon}</div>
    <div className="stat-info">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  // এই ডেটাগুলো পরে API থেকে আসবে
  const stats = {
    totalRevenue: 25450.50,
    totalOrders: 320,
    totalCustomers: 150,
    productsInStock: 85,
  };

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: 150.00, status: 'Shipped' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 75.25, status: 'Pending' },
    { id: 'ORD-003', customer: 'Mike Johnson', total: 320.00, status: 'Delivered' },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Admin Dashboard</h1>

      <div className="stats-grid">
        <StatCard icon={<FaDollarSign />} title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="#28a745" />
        <StatCard icon={<FaShoppingCart />} title="Total Orders" value={stats.totalOrders} color="#17a2b8" />
        <StatCard icon={<FaUsers />} title="Total Customers" value={stats.totalCustomers} color="#ffc107" />
        <StatCard icon={<FaBoxOpen />} title="Products" value={stats.productsInStock} color="#dc3545" />
      </div>

      <div className="recent-activity-section">
        <h2>Recent Orders</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;