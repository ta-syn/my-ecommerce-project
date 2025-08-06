// client/src/utils/validators.js

/**
 * ইমেইল অ্যাড্রেসটি বৈধ কিনা তা যাচাই করে।
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * পাসওয়ার্ডের ন্যূনতম দৈর্ঘ্য যাচাই করে।
 * @param {string} password - The password to validate.
 * @param {number} minLength - The minimum required length.
 * @returns {boolean} - Returns true if the password is long enough.
 */
export const isPasswordStrong = (password, minLength = 6) => {
  return password && password.length >= minLength;
};

/**
 * ইনপুটটি খালি কিনা তা যাচাই করে।
 * @param {string} value - The input value to check.
 * @returns {boolean} - Returns true if the value is not empty.
 */
export const isNotEmpty = (value) => {
  return value && value.trim() !== '';
};

/**
 * ফোন নম্বর (বাংলাদেশী ফরম্যাট) যাচাই করে।
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid.
 */
export const isValidPhoneNumber = (phone) => {
    if (!phone) return false;
    // +8801..., 8801..., 01... ফরম্যাট সমর্থন করে
    const phoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
    return phoneRegex.test(phone);
};