import React from 'react';
import '../styles/pages/_StaticPage.scss'; // কমন স্টাইল ব্যবহার করা হচ্ছে

const PrivacyPolicyPage = () => {
  return (
    <div className="static-page">
      <div className="page-container">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="last-updated">Last updated: January 1, 2025</p>

        <section className="page-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Spondonhub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
          </p>
        </section>

        <section className="page-section">
          <h2>2. Data We Collect About You</h2>
          <p>
            We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:
            <ul>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong>Financial Data:</strong> includes payment card details.</li>
              <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
            </ul>
          </p>
        </section>

        <section className="page-section">
          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process and deliver your order, manage our relationship with you, and improve our website and services.
          </p>
        </section>
        
        {/* বাস্তব প্রকল্পের জন্য এখানে আরও বিস্তারিত সেকশন যোগ করতে হবে */}

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;