// client/src/utils/helpers.js

/**
 * মুদ্রার ফরম্যাট ঠিক করে।
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency symbol (e.g., '$').
 * @returns {string} - The formatted currency string.
 */
export const formatCurrency = (amount, currency = '$') => {
  if (typeof amount !== 'number') {
    return `${currency}0.00`;
  }
  return `${currency}${amount.toFixed(2)}`;
};

/**
 * তারিখকে একটি পঠনযোগ্য ফরম্যাটে রূপান্তর করে।
 * @param {string | Date} dateString - The date to format.
 * @returns {string} - The formatted date string (e.g., "January 15, 2025").
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * লম্বা টেক্সটকে নির্দিষ্ট দৈর্ঘ্যে ছোট করে "..." যোগ করে।
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum length of the text.
 * @returns {string} - The truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};