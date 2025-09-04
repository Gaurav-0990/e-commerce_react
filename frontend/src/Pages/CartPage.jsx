import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("cart-page");
    return () => {
      document.body.classList.remove("cart-page");
    };
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("/api/cart");
      if (res.data && Array.isArray(res.data.cartItems)) {
        setCartItems(res.data.cartItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      await axios.put(`/api/cart/increase/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      await axios.put(`/api/cart/decrease/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px" }}>
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "3rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00f2ff, #ff00aa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(0, 242, 255, 0.7)",
        }}
      >
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: "#bbb" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          {cartItems.map((item) => {
            const product = item.productId || {};
            return (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "25px",
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0, 242, 255, 0.3)",
                  boxShadow: "0 4px 30px rgba(0, 242, 255, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 40px rgba(255, 0, 170, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 30px rgba(0, 242, 255, 0.1)";
                }}
              >
                {/* Product Image */}
                <img
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={product.title || "Product Image"}
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginRight: "20px",
                    border: "2px solid rgba(0, 242, 255, 0.4)",
                  }}
                />

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {product.title || "No Title"}
                  </h3>
                  <p style={{ margin: "0", color: "#ccc" }}>
                    Price:{" "}
                    <b style={{ color: "#00f2ff" }}>
                      {product.price && product.price !== "N/A"
                        ? `₹${product.price}`
                        : "N/A"}
                    </b>
                  </p>
                  <p style={{ margin: "6px 0", color: "#aaa" }}>
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* Quantity Buttons */}
                <div>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    style={{
                      background: "rgba(0, 255, 170, 0.15)",
                      color: "#00ffaa",
                      border: "1px solid #00ffaa",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "10px",
                      fontSize: "18px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = "#00ffaa")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background = "rgba(0, 255, 170, 0.15)")
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    style={{
                      background: "rgba(255, 0, 90, 0.15)",
                      color: "#ff3b6b",
                      border: "1px solid #ff3b6b",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "18px",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.background = "#ff3b6b")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background = "rgba(255, 0, 90, 0.15)")
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}

          {/* Checkout Button */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={goToCheckout}
              style={{
                padding: "16px 40px",
                fontSize: "20px",
                fontWeight: "600",
                background: "linear-gradient(45deg, #00f2ff, #ff00aa)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(0, 242, 255, 0.5)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow =
                  "0 0 35px rgba(255,0,170,0.8), 0 0 50px rgba(0,242,255,0.8)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow = "0 0 25px rgba(0, 242, 255, 0.5)";
                e.target.style.transform = "scale(1)";
              }}
            >
              🚀 Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;