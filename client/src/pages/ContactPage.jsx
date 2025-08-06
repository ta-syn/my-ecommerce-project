import React from 'react';
import '../styles/pages/_ContactPage.scss'; // স্টাইল পরে যোগ হবে

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="contact-page">
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, please feel free to reach out.</p>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="6" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
          <div className="contact-info-container">
            <h3>Our Office</h3>
            <p>123 Spondonhub Street<br />Dhaka, 1212<br />Bangladesh</p>
            <h3>Email Us</h3>
            <p>support@spondonhub.com</p>
            <h3>Call Us</h3>
            <p>+880 123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;