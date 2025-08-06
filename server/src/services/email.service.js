const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * ইমেইল পাঠানোর একটি সাধারণ ফাংশন।
 * @param {string} to - প্রাপকের ইমেইল।
 * @param {string} subject - ইমেইলের বিষয়।
 * @param {string} text - ইমেইলের সাধারণ টেক্সট।
 * @param {string} html - ইমেইলের HTML কন্টেন্ট।
 */
const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/**
 * অর্ডার কনফার্মেশন ইমেইল পাঠায়।
 * @param {object} order - অর্ডারের বিস্তারিত তথ্য।
 */
const sendOrderConfirmationEmail = async (order) => {
  const user = order.user; // ধরে নিচ্ছি অর্ডারে ব্যবহারকারীর তথ্য populate করা আছে
  const subject = `Your Spondonhub Order Confirmation #${order._id}`;
  const html = `
        <h1>Thank you for your order!</h1>
        <p>Hi ${user.name},</p>
        <p>We've received your order and will start working on it right away.</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
        <p>Thank you for shopping with Spondonhub!</p>
    `;

  await sendEmail(user.email, subject, '', html);
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
};
