import React, { useState } from 'react';
import './AdminOrders.css'; // স্টাইল পরে যোগ হবে

// স্যাম্পল ডেটা
const initialOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2025-01-10', total: 150.00, status: 'Shipped' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2025-01-09', total: 75.25, status: 'Pending' },
  { id: 'ORD-003', customer: 'Mike Johnson', date: '2025-01-08', total: 320.00, status: 'Delivered' },
  { id: 'ORD-004', customer: 'Emily White', date: '2025-01-07', total: 45.00, status: 'Canceled' },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    // এখানে API কল করে সার্ভারে স্ট্যাটাস আপডেট করা হবে
  };
  
  return (
    <div className="admin-orders">
      <h1 className="admin-page-title">Manage Orders</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`status-select status-${order.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;