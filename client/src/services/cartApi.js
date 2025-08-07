// client/src/services/cartApi.js

import axios from 'axios';

// আপনার ব্যাকএন্ডের API-এর মূল URL।
// .env ফাইল থেকে এটি লোড করা সবচেয়ে ভালো অভ্যাস।
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// একটি Axios ইনস্ট্যান্স তৈরি করা হচ্ছে যাতে আমরা টোকেনসহ রিকোয়েস্ট পাঠাতে পারি
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// প্রতিটি রিকোয়েস্টের সাথে স্বয়ংক্রিয়ভাবে টোকেন যোগ করার জন্য একটি ইন্টারসেপ্টর
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // localStorage থেকে টোকেন নেওয়া হচ্ছে
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const cartApi = {
  /**
   * ব্যবহারকারীর কার্টের সব আইটেম 가져오는 ফাংশন
   * @returns {Promise<axios.Response>}
   */
  getCartItems: () => {
    return apiClient.get('/cart');
  },

  /**
   * কার্টে একটি নতুন আইটেম যোগ করার ফাংশন
   * @param {object} item - যেমন: { productId: '...', quantity: 1 }
   * @returns {Promise<axios.Response>}
   */
  addItemToCart: (item) => {
    return apiClient.post('/cart/add', item);
  },

  /**
   * কার্ট থেকে একটি আইটেম মুছে ফেলার ফাংশন
   * @param {string} productId
   * @returns {Promise<axios.Response>}
   */
  removeItemFromCart: (productId) => {
    return apiClient.delete(`/cart/remove/${productId}`);
  },

  /**
   * কার্টের একটি আইটেমের পরিমাণ আপডেট করার ফাংশন
   * @param {string} productId
   * @param {number} quantity
   * @returns {Promise<axios.Response>}
   */
  updateItemQuantity: (productId, quantity) => {
    return apiClient.put(`/cart/update/${productId}`, { quantity });
  },

  /**
   * ব্যবহারকারীর কার্ট খালি করার ফাংশন
   * @returns {Promise<axios.Response>}
   */
  clearCart: () => {
    return apiClient.delete('/cart/clear');
  },
};

export default cartApi;