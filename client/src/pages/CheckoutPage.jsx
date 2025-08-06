import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import orderApi from '../services/orderApi';
import { formatCurrency } from '../utils/helpers';
import '../styles/pages/_CheckoutPage.scss';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // যদি কার্ট খালি থাকে বা ব্যবহারকারী লগইন করা না থাকে, তাহলে তাকে রিডাইরেক্ট করা হবে
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      navigate('/products');
    }
  }, [isAuthenticated, cartItems, navigate]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price,
        image: item.imageUrl,
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      paymentMethod: 'Cash on Delivery', // আপাতত ডিফল্ট
      itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      shippingPrice: 5.00,
      taxPrice: 0.00, // ট্যাক্স ক্যালকুলেশন পরে যোগ করা যেতে পারে
      totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5.00,
    };

    try {
      const response = await orderApi.createOrder(orderData);
      
      if (response.data.success) {
        clearCart(); // সফলভাবে অর্ডার প্লেস হলে কার্ট খালি করা হচ্ছে
        // ব্যবহারকারীকে অর্ডার কনফার্মেশন পেজে পাঠানো হচ্ছে এবং অর্ডার আইডি পাস করা হচ্ছে
        navigate('/order-confirmation', { state: { orderId: response.data.data._id } });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to place order. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="section-title">Shipping Information</h2>
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={formData.address} onChange={handleInputChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={formData.city} onChange={handleInputChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" value={formData.postalCode} onChange={handleInputChange} required disabled={loading} />
              </div>
            </div>
            <button type="submit" className="place-order-button" disabled={loading || cartItems.length === 0}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="order-summary-container">
          <h2 className="section-title">Your Order</h2>
          <div className="order-items-preview">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-total">
            <span>Shipping</span>
            <span>{formatCurrency(5.00)}</span>
          </div>
          <div className="summary-total final-total">
            <span>Total</span>
            <span>{formatCurrency(subtotal + 5.00)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;