import apiClient from './apiClient';

const authApi = {
  /**
   * ব্যবহারকারীকে রেজিস্টার করার জন্য API কল।
   * @param {object} userData - { name, email, password }
   * @returns {Promise<object>}
   */
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * ব্যবহারকারীকে লগইন করার জন্য API কল।
   * @param {object} credentials - { email, password }
   * @returns {Promise<object>} - Response includes user and token
   */
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * লগইন করা ব্যবহারকারীর প্রোফাইল ডেটা পাওয়ার জন্য API কল।
   * @returns {Promise<object>}
   */
  getProfile: () => {
    return apiClient.get('/users/profile');
  },
};

export default authApi;