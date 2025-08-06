import apiClient from './apiClient';

const productApi = {
  /**
   * সমস্ত পণ্য বা নির্দিষ্ট পৃষ্ঠার পণ্য আনার জন্য API কল।
   * @param {object} params - { page, limit, category }
   * @returns {Promise<object>}
   */
  getProducts: (params = {}) => {
    return apiClient.get('/products', { params });
  },

  /**
   * একটি নির্দিষ্ট পণ্য তার আইডি দিয়ে আনার জন্য API কল।
   * @param {string} productId
   * @returns {Promise<object>}
   */
  getProductById: (productId) => {
    return apiClient.get(`/products/${productId}`);
  },

  // --- অ্যাডমিন প্যানেলের জন্য ---

  /**
   * নতুন পণ্য তৈরি করার জন্য API কল।
   * @param {object} productData
   * @returns {Promise<object>}
   */
  createProduct: (productData) => {
    // সাধারণত FormData ব্যবহার করা হয় ইমেজ আপলোডের জন্য
    return apiClient.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * একটি পণ্য আপডেট করার জন্য API কল।
   * @param {string} productId
   * @param {object} updateData
   * @returns {Promise<object>}
   */
  updateProduct: (productId, updateData) => {
    return apiClient.put(`/products/${productId}`, updateData);
  },

  /**
   * একটি পণ্য ডিলেট করার জন্য API কল।
   * @param {string} productId
   * @returns {Promise<object>}
   */
  deleteProduct: (productId) => {
    return apiClient.delete(`/products/${productId}`);
  },
};

export default productApi;