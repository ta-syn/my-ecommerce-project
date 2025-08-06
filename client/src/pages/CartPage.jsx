import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import cartApi from '../services/cartApi'; // ✅ Cart API ব্যবহার করা হচ্ছে
import { formatCurrency } from '../utils/helpers';
import CartContext from '../contexts/CartContext';
import '../styles/pages/_CartPage.scss';

const CartPage = () => {
  const { cartItems, setCartItems, addItemToCart, removeItemFromCart, updateItemQuantity } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ প্রথম লোডে API থেকে কার্ট ডেটা ফেচ করা হবে
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await cartApi.getCartItems(); // ✅ Cart API থেকে ডেটা
        if (response && response.data) {
          setCartItems(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart data:', err);
        setError('Failed to load cart data.');
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCartItems]);

  // ✅ সাবটোটাল, শিপিং, টোটাল ক্যালকুলেশন
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.0; // ফিক্সড শিপিং চার্জ
  const total = subtotal + shipping;

  // ✅ কার্ট আইটেম রিমুভ
  const handleRemove = async (productId) => {
    try {
      await cartApi.removeCartItem(productId); // API কল
      removeItemFromCart(productId); // Context আপডেট
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item.');
    }
  };

  // ✅ কার্ট আইটেম কোয়ান্টিটি আপডেট
  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity > 0) {
      try {
        await cartApi.updateCartItem(productId, { quantity }); // API কল
        updateItemQuantity(productId, quantity); // Context আপডেট
      } catch (err) {
        console.error('Error updating quantity:', err);
        setError('Failed to update item quantity.');
      }
    } else {
      handleRemove(productId);
    }
  };

  // ✅ লোডিং বা এরর স্টেট হ্যান্ডেল
  if (loading) {
    return <div className="loading-message">Loading cart...</div>;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is currently empty.</p>
          <Link to="/products" className="cta-button">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{formatCurrency(item.price)}</p>
                </div>
                <div className="item-quantity-controls">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly className="quantity-input" />
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">{formatCurrency(item.price * item.quantity)}</div>
                <button onClick={() => handleRemove(item.id)} className="remove-button">&times;</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
