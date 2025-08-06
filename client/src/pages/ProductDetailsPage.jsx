import React, { useState, useEffect, useContext } from 'react'; // useContext ইম্পোর্ট করা হলো
import { useParams, Link, useNavigate } from 'react-router-dom';
import productApi from '../services/productApi';
import CartContext from '../contexts/CartContext'; // CartContext ইম্পোর্ট করা হলো
import { formatCurrency } from '../utils/helpers';
import '../styles/pages/_ProductDetailsPage.scss';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addItemToCart } = useContext(CartContext); // CartContext থেকে addItemToCart ফাংশনটি নেওয়া হলো
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productApi.getProductById(productId);
        setProduct(response.data.data);
      } catch (err) {
        setError('Failed to fetch product details. The product may not exist.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    // CartContext-এর addItemToCart ফাংশনকে কল করা হচ্ছে
    const productToAdd = {
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
    };
    addItemToCart(productToAdd, quantity);
    
    // ব্যবহারকারীকে একটি ফিডব্যাক দেওয়া হচ্ছে এবং কার্ট পেজে যাওয়ার অপশন দেওয়া হচ্ছে
    alert(`${quantity} x ${product.name} added to cart!`);
    if(window.confirm("Do you want to go to the cart?")){
        navigate('/cart');
    }
  };

  if (loading) return <div className="loading-message">Loading product details...</div>;
  if (error) return <div className="error-message">{error} <Link to="/products">Go back to products.</Link></div>;
  if (!product) return <div className="info-message">Product not found.</div>;

  return (
    <div className="product-details-page">
      <div className="details-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info-section">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-brand">Brand: {product.brand}</p>
          <p className="product-price">{formatCurrency(product.price)}</p>
          <p className="product-description">{product.description}</p>
          
          <div className="stock-info">
            Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>

          {product.countInStock > 0 && (
            <div className="actions-container">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                  min="1"
                  max={product.countInStock}
                />
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;