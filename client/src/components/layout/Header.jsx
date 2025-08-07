import React, { useState, useContext } from 'react'; // useContext ইম্পোর্ট করা হলো
import { Link, NavLink } from 'react-router-dom';
import CartContext from '../../contexts/CartContext'; // CartContext ইম্পোর্ট করা হলো
import { useAuth } from '../../hooks/useAuth'; // useAuth হুক
import '@/styles/layout/_Header.scss';
import logo from '@/assets/images/logos/spondonhub-logo-color.svg';

// আইকনগুলো
const CartIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg>;
const UserIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>;
const SearchIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext); // CartContext থেকে cartCount নেওয়া হলো
  const { isAuthenticated } = useAuth(); // AuthContext থেকে লগইন অবস্থা নেওয়া হলো

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
<img src={logo} alt="Spondonhub Logo" />
          </Link>
        </div>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
        </nav>

        <div className="header-actions">
          <button className="action-btn"><SearchIcon /></button>
          
          <Link to="/cart" className="action-btn">
            <CartIcon />
            {cartCount > 0 && (
              // cartCount শূন্যের বেশি হলেই শুধু ব্যাজটি দেখানো হবে
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {isAuthenticated ? (
            // যদি ব্যবহারকারী লগইন করা থাকেন, তাহলে ড্যাশবোর্ডের লিঙ্ক দেখানো হবে
            <Link to="/customer-dashboard" className="action-btn"><UserIcon /></Link>
          ) : (
            // যদি লগইন করা না থাকেন, তাহলে লগইন পেজের লিঙ্ক দেখানো হবে
            <Link to="/login" className="action-btn"><UserIcon /></Link>
          )}
        </div>
        
        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;