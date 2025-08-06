import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import Pagination from '../components/products/Pagination';
import productApi from '../services/productApi'; // API সার্ভিস ইম্পোর্ট করা হলো
import '../styles/pages/_ProductsPage.scss'; // স্টাইল ফাইল

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ডেটা লোড হওয়ার অবস্থা ট্র্যাক করার জন্য
  const [error, setError] = useState(null); // কোনো এরর হলে তা ধরার জন্য
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // এই useEffect হুকটি কম্পোনেন্ট লোড হওয়ার সময় এবং currentPage পরিবর্তন হওয়ার সময় কাজ করবে
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // ডেটা আনা শুরু
        setError(null);

        // আমাদের productApi সার্ভিস থেকে getProducts ফাংশনটিকে কল করা হচ্ছে
        const response = await productApi.getProducts({ page: currentPage, limit: 8 });
        
        // সার্ভার থেকে পাওয়া ডেটা দিয়ে স্টেট আপডেট করা হচ্ছে
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.totalPages);

      } catch (err) {
        // যদি কোনো এরর হয়, তাহলে এরর মেসেজ সেট করা হচ্ছে
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); // ডেটা আনা শেষ (সফল হোক বা ব্যর্থ)
      }
    };

    fetchProducts();
  }, [currentPage]); // currentPage পরিবর্তন হলে এই হুকটি আবার চলবে

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ডেটা লোড হওয়ার সময় একটি লোডিং মেসেজ দেখানো হবে
  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  // কোনো এরর হলে এরর মেসেজ দেখানো হবে
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-page">
      <h1 className="page-title">Our Products</h1>
      
      {products.length > 0 ? (
        <>
          <div className="product-grid">
            {products.map(product => (
              // ProductCard-এ এখন আসল ডেটা পাস করা হচ্ছে
              <ProductCard key={product._id} product={{ ...product, id: product._id }} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;