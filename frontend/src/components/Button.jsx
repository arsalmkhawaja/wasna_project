// backend/components/Button.jsx
import React from "react";
import "../styles/Button.css"; // Separate CSS for buttons

const Button = ({ children, onClick, className }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
