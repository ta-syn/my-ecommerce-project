import React from 'react';

import '../styles/pages/_StaticPage.scss' // অন্যান্য সাধারণ পেজের জন্য কমন স্টাইল

const AboutPage = () => {
  return (
    <div className="static-page">
      <div className="page-container">
        <h1 className="page-title">About Spondonhub</h1>
        
        <section className="page-section">
          <h2>Our Story</h2>
          <p>
            Spondonhub was founded in 2025 with a simple mission: to provide high-quality products that bring joy and convenience to everyday life. We started as a small online store with a passion for innovation and customer satisfaction. Today, we are proud to serve thousands of happy customers worldwide.
          </p>
        </section>

        <section className="page-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to be your most trusted shopping destination. We are committed to offering an extensive range of curated products, ensuring a seamless shopping experience, and providing exceptional customer service. We believe in quality, affordability, and sustainability.
          </p>
        </section>

        <section className="page-section">
          <h2>Meet the Team</h2>
          <p>
            We are a dedicated team of creators, thinkers, and problem-solvers who are passionate about what we do. We work tirelessly to source the best products and build a platform that you love to use.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;