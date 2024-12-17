// frontend/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import wasna_logo from "../assets/wasna logo.png"; // Ensure correct path

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#001f3f', // Deep Navy
    padding: '40px 20px',
    color: '#ffffff',
    textAlign: 'center',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const linkStyle = {
    color: '#d4a373',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <footer style={footerStyle}>
      <div style={sectionStyle}>
        <img src={wasna_logo} alt="Wasna Palace Logo" style={{ height: '50px' }} />
      </div>
      <div style={sectionStyle}>
        <p>📍 Block E Jinnah Garden, Islamabad, ICT, 44000</p>
        <p>📞 Call us: +XXX XXXX XXXX</p>
      </div>
      <div style={sectionStyle}>
        <IconButton href="#" style={{ color: '#d4a373' }}>
          <Facebook />
        </IconButton>
        <IconButton href="#" style={{ color: '#d4a373' }}>
          <Instagram />
        </IconButton>
        <IconButton href="#" style={{ color: '#d4a373' }}>
          <Twitter />
        </IconButton>
      </div>
      <div style={sectionStyle}>
        <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
        <Link to="/terms-of-service" style={linkStyle}>Terms of Service</Link>
        <Link to="/cookies" style={linkStyle}>Cookies</Link>
      </div>
      <div>
        <p>© 2024 Wasna Palace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
