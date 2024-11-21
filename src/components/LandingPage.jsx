import React from "react";
import { Helmet } from "react-helmet";
import "../styles/LandingPage.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import wasna_logo from "../assets/wasna logo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Wasna Palace - Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your next big event at Wasna Palace. Offering premium event management with world-class facilities."
        />
      </Helmet>

      {/* Navbar */}
      <nav className="custom-navbar">
        <div className="navbar-container">
          {/* Left Links */}
          <ul className="navbar-links left-links">
            <li className="active">Home</li>
            <li>Event Management</li>
            <li>Event Complex</li>
            <li>4D Restaurant</li>
          </ul>

          {/* Logo */}
          <div className="navbar-logo">
            <img src={wasna_logo} alt="Wasna Palace Logo" />
          </div>

          {/* Right Links */}
          <ul className="navbar-links right-links">
            <li>Wasna Pure</li>
            <li>Wasna Harmony Vista</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${require("../assets/img1.jpg")})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Wasna Palace</h1>
          <p className="hero-subtitle">Make your Event Memorable</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="why-choose-us-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequatur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem.
          </p>
          <img src={img2} alt="Decorated Tent" className="blur-on-hover" />
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>Services</h2>
        <div className="services-container">
          <img src={img3} alt="Decorated Table" className="blur-on-hover" />
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit:</p>
            <ul>
              <li>Maxime</li>
              <li>Consequuntur</li>
              <li>Voluptatum</li>
              <li>Laborum</li>
            </ul>
            <button className="event-management-button">
              Event Management →
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-grid">
          <div>2000+ Guest Capacity</div>
          <div>200+ Car Parking</div>
          <div>4 Halls Available</div>
          <div>20+ Dishes Menu</div>
        </div>
      </section>

      {/* Location */}
      <section className="location">
        <h2>Location</h2>
        <img src="/path/to/map-image.jpg" alt="Map showing location" />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <p>© 2024 Wasna Palace. All rights reserved.</p>
          <p>
            Block E Jinnah Garden, Islamabad, ICT, 44000 | Call us: +XXX XXXX
            XXXX
          </p>
        </div>
        <div className="social-icons">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
