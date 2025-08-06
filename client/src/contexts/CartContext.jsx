import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 1. CartContext তৈরি করা
const CartContext = createContext();

// 2. CartProvider কম্পোনেন্ট তৈরি করা
export const CartProvider = ({ children }) => {
  // localStorage থেকে কার্টের ডেটা নিয়ে স্টেট ইনিশিয়ালাইজ করা হচ্ছে
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('spondonhub_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Failed to parse cart data from localStorage', error);
      return [];
    }
  });

  // যখনই cartItems পরিবর্তন হবে, তখন localStorage-এ সেভ করা হবে
  useEffect(() => {
    localStorage.setItem('spondonhub_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // কার্টে একটি পণ্য যোগ করার ফাংশন
  const addItemToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // যদি পণ্যটি কার্টে আগে থেকেই থাকে, তাহলে শুধু তার সংখ্যা বাড়ানো হবে
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // যদি পণ্যটি নতুন হয়, তাহলে এটিকে কার্টে যোগ করা হবে
      return [...prevItems, { ...product, quantity }];
    });
  };

  // কার্ট থেকে একটি পণ্য সম্পূর্ণভাবে সরিয়ে দেওয়ার ফাংশন
  const removeItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // কার্টে থাকা একটি পণ্যের সংখ্যা আপডেট করার ফাংশন
  const updateItemQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };
  
  // কার্ট খালি করার ফাংশন
  const clearCart = () => {
    setCartItems([]);
  };

  // কনটেক্সটের মাধ্যমে এই ভ্যালু এবং ফাংশনগুলো সরবরাহ করা হবে
  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;