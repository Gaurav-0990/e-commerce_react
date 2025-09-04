import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("/api/");
      setProductData(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (products) => {
    if (sortOption === "low-high") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const handleFilter = (products) => {
    if (categoryFilter === "All") return products;
    return products.filter(
      (p) => p.category && p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = handleSort(
    handleFilter(
      productData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  );

  return (
    <div className="home-wrapper">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filters and Sort */}
      <div className="filters">
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Game">Games</option>
          <option value="Cards">Cards</option>
          <option value="Board">Board Games</option>
        </select>
      </div>

      <div className="container">
        {filteredProducts.map((elem, index) => (
          <div className="card" key={index}>
            <div className="top">
              <img
  src={elem.image || "https://via.placeholder.com/280x180?text=No+Image"}
  alt={elem.title}
  onError={(e) => {
    if (e.target.src !== "https://via.placeholder.com/280x180?text=No+Image") {
      e.target.src = "https://via.placeholder.com/280x180?text=No+Image";
    }
  }}
/>

            </div>
            <div className="bottom">
              <Link to={`/admin/products/detail/${elem._id}`}>{elem.title}</Link>
              <p>{elem.description}</p>
              <h2>Price : ₹{elem.price}</h2>

              <button
                onClick={async () => {
                  try {
                    await fetch(`/api/cart/add/${elem._id}`, {
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

              {/* Wishlist button */}
              <button
                className={`wishlist-btn ${
                  wishlist.includes(elem._id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(elem._id)}
              >
                {wishlist.includes(elem._id) ? "❤️ Wishlisted" : "🤍 Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;