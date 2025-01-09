import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = [...products];

      // Apply category filter
      if (filter) {
        updatedProducts = updatedProducts.filter(
          (product) => product.category === filter
        );
      }

      // Apply search query
      if (searchQuery.trim()) {
        updatedProducts = updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(updatedProducts);
    };

    applyFilters();
  }, [searchQuery, filter, products]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.name} has been added to the cart!`);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-products">
      <h1>All Products</h1>
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Smartphones & Accessories">Smartphones & Accessories</option>
          <option value="Laptops & Tablets">Laptops & Tablets</option>
          <option value="Televisions & Accessories">Televisions & Accessories</option>
          <option value="Audio Devices">Audio Devices</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Gaming Devices">Gaming Devices</option>
          <option value="Cameras & Photography Gear">Cameras & Photography Gear</option>
          <option value="Wearables & Smartwatches">Wearables & Smartwatches</option>
          <option value="PC Components & Accessories">PC Components & Accessories</option>
          <option value="Miscellaneous Gadgets">Miscellaneous Gadgets</option>
        </select>
        {/* <button onClick={goToCart}>Go to Cart</button> */}
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.customId} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>₹{product.price}</strong></p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
