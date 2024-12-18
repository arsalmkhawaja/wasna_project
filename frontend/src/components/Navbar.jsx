import React from "react";
import { NavLink } from "react-router-dom";
import wasna_logo from "../assets/wasna logo.png";
import "../styles/LandingPage.css";

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <ul className="navbar-links left-links">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/event-management" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Event Complex
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/event-complex" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Wasna Palace
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/restaurant" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              4D Restaurant
            </NavLink>
          </li>
        </ul>
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={wasna_logo} alt="Wasna Palace Logo" />
          </NavLink>
        </div>
        <ul className="navbar-links right-links">
          <li>
            <NavLink 
              to="/wasna-pure" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Pure
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/harmony-vista" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Harmony Vista
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about-us" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact-us" 
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
