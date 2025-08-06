import apiClient from './apiClient';

const orderApi = {
  /**
   * নতুন অর্ডার তৈরি করার জন্য API কল।
   * @param {object} orderData - { cartItems, shippingAddress, paymentDetails }
   * @returns {Promise<object>}
   */
  createOrder: (orderData) => {
    return apiClient.post('/orders', orderData);
  },

  /**
   * লগইন করা ব্যবহারকারীর সমস্ত অর্ডার আনার জন্য API কল।
   * @returns {Promise<object>}
   */
  getMyOrders: () => {
    return apiClient.get('/orders/my-orders');
  },

  /**
   * একটি নির্দিষ্ট অর্ডার তার আইডি দিয়ে আনার জন্য API কল।
   * @param {string} orderId
   * @returns {Promise<object>}
   */
  getOrderById: (orderId) => {
    return apiClient.get(`/orders/${orderId}`);
  },

  // --- অ্যাডমিন প্যানেলের জন্য ---

  /**
   * সমস্ত অর্ডার আনার জন্য API কল। (অ্যাডমিন)
   * @returns {Promise<object>}
   */
  getAllOrders: () => {
    return apiClient.get('/orders');
  },

  /**
   * অর্ডারের স্ট্যাটাস আপডেট করার জন্য API কল। (অ্যাডমিন)
   * @param {string} orderId
   * @param {object} statusUpdate - { status }
   * @returns {Promise<object>}
   */
  updateOrderStatus: (orderId, statusUpdate) => {
    return apiClient.put(`/orders/${orderId}/status`, statusUpdate);
  },
};

export default orderApi;