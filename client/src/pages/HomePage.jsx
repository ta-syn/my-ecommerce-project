import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import productApi from '../services/productApi'; // API সার্ভিস ইম্পোর্ট করা হলো
import '../styles/pages/_HomePage.scss'; // স্টাইল ফাইল

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // এই useEffect হুকটি কম্পোনেন্ট লোড হওয়ার সময় একবারই কাজ করবে
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // getProducts API কল করে প্রথম ৪টি পণ্য আনা হচ্ছে ফিচারড সেকশনের জন্য
        // আমরা এখানে একটি 'limit' প্যারামিটার পাস করতে পারি
        const response = await productApi.getProducts({ limit: 4 });
        
        setFeaturedProducts(response.data.data.products);

      } catch (err) {
        setError('Could not load featured products. Please check back later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); // খালি অ্যারে [] মানে এই ইফেক্টটি শুধুমাত্র প্রথমবার রেন্ডার হওয়ার সময় চলবে

  // ফিচারড পণ্য সেকশনটি রেন্ডার করার জন্য একটি ছোট ফাংশন
  const renderFeaturedProducts = () => {
    if (loading) {
      return <p>Loading featured products...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (featuredProducts.length === 0) {
      return <p>No featured products available at the moment.</p>;
    }
    
    return (
      <div className="product-grid">
        {featuredProducts.map(product => (
          <ProductCard key={product._id} product={{ ...product, id: product._id }} />
        ))}
      </div>
    );
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Spondonhub</h1>
          <p className="hero-subtitle">Find everything you need, all in one place.</p>
          <Link to="/products" className="hero-cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <h2 className="section-title">Featured Products</h2>
        {renderFeaturedProducts()}
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="cta-title">Join Our Community</h2>
        <p>Get the latest updates on new arrivals and special offers.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;