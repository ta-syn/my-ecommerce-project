import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/_Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3 className="footer-title">Spondonhub</h3>
          <p>Your complete shopping destination. We provide the best quality products at unbeatable prices.</p>
        </div>

        <div className="footer-section links">
          <h3 className="footer-title">Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            {/* এখানে আসল আইকন ব্যবহার করতে হবে */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-title">Subscribe to our Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {currentYear} Spondonhub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;