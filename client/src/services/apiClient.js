// client/src/services/apiClient.js
import axios from 'axios';

// আপনার ব্যাকএন্ড সার্ভারের URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// একটি ইন্টারসেপ্টর সেট আপ করা হচ্ছে
// প্রতিটি রিকোয়েস্ট পাঠানোর আগে এই ফাংশনটি চলবে
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('spondonhub_token');
    if (token) {
      // যদি টোকেন থাকে, তাহলে হেডার-এ যুক্ত করে দেবে
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;