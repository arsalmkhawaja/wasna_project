// src/components/Navbar.js
import React from "react";
import wasna_logo from "../assets/wasna logo.png";
import "../styles/LandingPage.css";

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <ul className="navbar-links left-links">
          <li className="active">Home</li>
          <li>Event Management</li>
          <li>Event Complex</li>
          <li>4D Restaurant</li>
        </ul>
        <div className="navbar-logo">
          <img src={wasna_logo} alt="Wasna Palace Logo" />
        </div>
        <ul className="navbar-links right-links">
          <li>Wasna Pure</li>
          <li>Wasna Harmony Vista</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
