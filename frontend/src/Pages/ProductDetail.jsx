import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Debug: log the id from the URL
  console.log("Product ID from URL:", productId);

  useEffect(() => {
    if (!productId) {
      setError('No product ID provided in URL');
      setLoading(false);
      return;
    }
    axios.get(`/api/products/${productId}`)
      .then(res => {
        console.log("Backend response:", res.data);
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(err => {
        setError('Product not found');
        setLoading(false);
      });
  }, [productId]);

  if (loading) return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="product-container">
        <div>Loading...</div>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="product-container">
        <div>{error}</div>
      </div>
    </>
  );

  if (!product) return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="product-container">
        <div>No product data</div>
      </div>
    </>
  );

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="product-container">
        <div className="main">
          <div className="left">
            <img 
              src={product.image || "https://via.placeholder.com/240x320?text=No+Image"} 
              alt={product.title}
              onError={(e) => {
                if (e.target.src !== "https://via.placeholder.com/240x320?text=No+Image") {
                  e.target.src = "https://via.placeholder.com/240x320?text=No+Image";
                }
              }}
            />
          </div>
          <div className="right">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <h2 style={{color: '#22c55e', fontSize: '1.5rem', margin: '10px 0'}}>
              Price: ₹{product.price}
            </h2>
            
            <div className="bottom">
              <button onClick={() => alert('Buy Now functionality to be implemented')}>
                Buy Now
              </button>
              <button 
                onClick={async () => {
                  try {
                    await fetch(`/api/cart/add/${product._id}`, {
                      method: "POST",
                    });
                    alert("Product added to cart");
                  } catch (error) {
                    console.error("Error adding product to cart:", error);
                    alert("Failed to add product to cart");
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;