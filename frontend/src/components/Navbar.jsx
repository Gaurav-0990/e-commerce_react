import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-left">
        <h2 className="logo">Shopy</h2>
      </div>

      {/* Middle Menu */}
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li> 
        <li><Link to="/about">About</Link></li>
        <li className="dropdown">
          <span>Students ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/students/results">Results</Link></li>
            <li><Link to="/students/attendance">Attendance</Link></li>
            <li><Link to="/students/library">Library</Link></li>
            <li><Link to="/students/fees">Fees</Link></li>
          </ul>
        </li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Search Bar */}
      <div className="nav-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
        />
        <i className="ri-search-line" onClick={onSearch}></i>
      </div>

      {/* Right Buttons */}
      <div className="nav-right">
        {/* <Link to="/admin/products/add" className="btn">Add Product</Link> */}
        <Link to="/cart" className="btn cart-btn">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;