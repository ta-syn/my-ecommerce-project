import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// সব পেইজ ইম্পোর্ট করা হচ্ছে
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

// অ্যাডমিন পেইজ ইম্পোর্ট করা হচ্ছে
import AdminDashboard from './admin-pages/AdminDashboard';
import AdminProducts from './admin-pages/AdminProducts';
import AdminOrders from './admin-pages/AdminOrders';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Private User Routes */}
          <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
          
          {/* Admin Routes */}
          {/* বাস্তব প্রকল্পে এই রাউটগুলো একটি অ্যাডমিন লেআউটের ভেতরে থাকবে এবং সুরক্ষিত থাকবে */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" an element={<AdminOrders />} />

          {/* 404 Not Found Route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}

        {/* --- Protected Routes --- */}
          {/* এই রাউটগুলো এখন সুরক্ষিত */}
          <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute>
                <CustomerDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/order-confirmation" 
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;