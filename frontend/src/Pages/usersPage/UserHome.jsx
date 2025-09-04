import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";

const UserHome = () => {
  const [productData, setProductData] = useState([]);

  // ✅ Use Vite environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      const products = res.data.products || [];
      const filteredProducts = products.filter(
        (p) =>
          p?._id && p?.title && p.title.trim() !== ""
      );
      setProductData(filteredProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`/api/cart/add/${productId}`);
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div>
      <UserNav />
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {productData.length === 0 ? (
          <h2>No products found</h2>
        ) : (
          productData.map((elem) => (
            <div key={elem._id} className="card" style={{ border: '1px solid #ccc', borderRadius: '12px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="top">
                <img
                  src={elem.image || "/placeholder.png"}
                  alt={elem.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                />
              </div>
              <div className="bottom" style={{ marginTop: '10px' }}>
                <Link to={`/products/detail/${elem._id}`} style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold', fontSize: '18px' }}>
                  {elem.title}
                </Link>
                <p style={{ color: '#555', margin: '10px 0' }}>{elem.description}</p>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '10px 0' }}>₹{elem.price}</h2>
                <button
                  onClick={() => handleAddToCart(elem._id)}
                  style={{ padding: '8px 15px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserHome;
