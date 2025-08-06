// client/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx'; // <-- CartProvider ইম্পোর্ট করুন
import './styles/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* <-- AuthProvider-এর ভেতরে CartProvider যোগ করুন */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);