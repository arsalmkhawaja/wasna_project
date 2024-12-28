import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing hamburger and close icons
import wasna_logo from "../assets/wasna logo.png";
import "../styles/LandingPage.css";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to close drawer when a link is clicked
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={wasna_logo} alt="Wasna Palace Logo" />
            </NavLink>
          </div>
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
                to="/event-complex"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Event Complex
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wasna-palace"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Wasna Palace
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/restaurant"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                4D Restaurant
              </NavLink>
            </li> */}

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

          {/* Hamburger Icon (Visible on Mobile) */}
          <div className="hamburger" onClick={toggleDrawer}>
            {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {drawerOpen && <div className="overlay" onClick={toggleDrawer}></div>}

      <div className={`drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-close" onClick={closeDrawer}>
          <FaTimes size={24} />
        </div>

        <ul className="drawer-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/event-management"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Event Complex
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/event-complex"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Wasna Palace
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/restaurant"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              4D Restaurant
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wasna-pure"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Pure
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/harmony-vista"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Harmony Vista
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={closeDrawer}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
