import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/components/_ProductCard.scss'; // স্টাইলের জন্য

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;