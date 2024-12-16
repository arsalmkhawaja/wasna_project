import React from "react";
import { Link } from "react-router-dom";
import wasna_logo from "../assets/wasna logo.png";

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <ul className="navbar-links left-links">
          <li className="active">
            <Link to="/" style={{ color: '#d4a373', textDecoration: 'none' }}>Home</Link>
          </li>
          <li>
            <Link to="/event-management" style={{ color: '#d4a373', textDecoration: 'none' }}>Event Complex</Link>
          </li>
          <li>
            <Link to="/event-complex" style={{ color: '#d4a373', textDecoration: 'none' }}>Palace</Link>
          </li>
          <li>
            <Link to="/4d-restaurant" style={{ color: '#d4a373', textDecoration: 'none' }}>4D</Link>
          </li>
        </ul>
        <div className="navbar-logo">
          <Link to="/">
            <img src={wasna_logo} alt="Wasna Palace Logo" />
          </Link>
        </div>
        <ul className="navbar-links right-links">
          <li>
            <Link to="/wasna-pure" style={{ color: '#d4a373', textDecoration: 'none' }}>Wasna Pure</Link>
          </li>
          <li>
            <Link to="/harmony-vista" style={{ color: '#d4a373', textDecoration: 'none' }}>Wasna Harmony Vista</Link>
          </li>
          <li>
            <Link to="/about-us" style={{ color: '#d4a373', textDecoration: 'none' }}>About Us</Link>
          </li>
          <li>
            <Link to="/contact-us" style={{ color: '#d4a373', textDecoration: 'none' }}>Contact Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
