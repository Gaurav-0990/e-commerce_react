import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ id, title, description, price, image, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <Link to={`/product/${id}`}>
        <h2 className="product-title">
          {title}
        </h2>
      </Link>
      <p className="product-desc">{description}</p>
      <p className="product-price">₹{price}</p>
      <button
        onClick={onAddToCart}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
