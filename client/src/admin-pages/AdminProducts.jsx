import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/pages/_AdminPages.scss';

// স্যাম্পল ডেটা (পরে API থেকে আসবে)
const initialProducts = [
  { id: 1, name: 'Premium T-Shirt', category: 'Apparel', price: 25.00, stock: 120 },
  { id: 2, name: 'Smartwatch V2', category: 'Electronics', price: 199.99, stock: 50 },
  { id: 3, name: 'Leather Bag', category: 'Accessories', price: 75.50, stock: 75 },
];

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = () => {
    // এখানে নতুন পণ্য যোগ করার জন্য একটি মডাল বা নতুন পেজ দেখানো হবে
    alert('Add new product functionality goes here.');
  };

  const handleEdit = (id) => {
    alert(`Editing product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      // এখানে API কল করে সার্ভার থেকেও ডিলেট করা হবে
    }
  };

  return (
    <div className="admin-products">
      <div className="page-header">
        <h1 className="admin-page-title">Manage Products</h1>
        <button onClick={handleAddProduct} className="add-new-btn">
          <FaPlus /> Add New Product
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="action-cell">
                  <button onClick={() => handleEdit(product.id)} className="action-btn edit-btn"><FaEdit /></button>
                  <button onClick={() => handleDelete(product.id)} className="action-btn delete-btn"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;