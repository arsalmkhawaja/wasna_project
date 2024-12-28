import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Adding User icon
import wasna_logo from "../assets/wasna logo.png";
import "../styles/LandingPage.css";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for user login status
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to get current location (page the user is on)

  // Check if the user is logged in (i.e., a token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
    } else {
      setIsLoggedIn(false); // User is not logged in if no token exists
    }
  }, []); // Empty dependency array to run only on component mount

  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to close drawer when a link is clicked
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  // Handlers for Login and Signup navigation
  const handleLoginClick = () => {
    navigate("/signup&login", { state: { from: location } }); // Pass the current page URL
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the state to reflect the user is logged out
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <>
      <nav>
        <div className="custom-navbar">
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
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/event-complex"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Event Complex
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wasna-palace"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Wasna Palace
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wasna-pure"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Pure
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/harmony-vista"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Harmony Vista
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Hamburger Icon (Visible on Mobile) */}
          <div className="hamburger" onClick={toggleDrawer}>
            {drawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>

          {/* User Options: Logout and Profile */}
          <div className="navbar-user">
            {isLoggedIn ? (
              <>
                <button onClick={handleSignOut} className="logout-button">
                  Sign Out
                </button>
                <FaUserCircle
                  className="profile-icon"
                  size={32}
                  onClick={handleProfileClick}
                  title="Profile"
                />
              </>
            ) : (
              <button className="login-button" onClick={handleLoginClick}>
                Login
              </button>
            )}
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
