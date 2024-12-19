// Checkout.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      tempErrors.email = "Invalid email address.";
    }
    if (!formData.phone) tempErrors.phone = "Phone number is required.";
    if (!formData.address) tempErrors.address = "Address is required.";
    if (!formData.city) tempErrors.city = "City is required.";
    if (!formData.state) tempErrors.state = "State is required.";
    if (!formData.zip) tempErrors.zip = "ZIP code is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Here you can handle form submission, e.g., send data to the backend
      alert("Order placed successfully!");
      // Reset the form or navigate to a confirmation page
      navigate("/");
    }
  };

  // Inline styles
  const checkoutContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px",
    fontFamily: '"Lato", sans-serif',
    minHeight: "100vh",
    background: "#fafafa",
    paddingTop: "100px",
  };

  const formContainerStyle = {
    flex: "1",
    minWidth: "300px",
    marginRight: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const summaryContainerStyle = {
    flex: "1",
    minWidth: "300px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxHeight: "80vh",
    overflowY: "auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.9em",
  };

  const paymentMethodsStyle = {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  };

  const paymentLabelStyle = {
    marginLeft: "8px",
  };

  const placeOrderButtonStyle = {
    background: "#b10101",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "12px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1.1em",
    marginTop: "20px",
    transition: "background 0.3s ease",
  };

  const placeOrderButtonHoverStyle = {
    background: "#d40f0f",
  };

  const [isPlaceOrderHovered, setIsPlaceOrderHovered] = useState(false);

  return (
    <div style={checkoutContainerStyle}>
      <Helmet>
        <title>Checkout - Wasna Palace</title>
        <meta
          name="description"
          content="Complete your purchase at Wasna Palace. Provide your details and choose a payment method."
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* User Information Form */}
      <div style={formContainerStyle}>
        <h2 style={{ fontFamily: '"Playfair Display", serif' }}>
          Billing Details
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle} htmlFor="name">
            Full Name
          </label>
          <input
            style={inputStyle}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}

          <label style={labelStyle} htmlFor="email">
            Email Address
          </label>
          <input
            style={inputStyle}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}

          <label style={labelStyle} htmlFor="phone">
            Phone Number
          </label>
          <input
            style={inputStyle}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

          <label style={labelStyle} htmlFor="address">
            Address
          </label>
          <input
            style={inputStyle}
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p style={errorStyle}>{errors.address}</p>}

          <label style={labelStyle} htmlFor="city">
            City
          </label>
          <input
            style={inputStyle}
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p style={errorStyle}>{errors.city}</p>}

          <label style={labelStyle} htmlFor="state">
            State
          </label>
          <input
            style={inputStyle}
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && <p style={errorStyle}>{errors.state}</p>}

          <label style={labelStyle} htmlFor="zip">
            ZIP Code
          </label>
          <input
            style={inputStyle}
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
          {errors.zip && <p style={errorStyle}>{errors.zip}</p>}

          {/* Payment Methods */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif' }}>
              Payment Method
            </h3>
            <div style={paymentMethodsStyle}>
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label style={paymentLabelStyle} htmlFor="card">
                Card
              </label>
            </div>
            <div style={paymentMethodsStyle}>
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label style={paymentLabelStyle} htmlFor="cod">
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            style={{
              ...placeOrderButtonStyle,
              ...(isPlaceOrderHovered ? placeOrderButtonHoverStyle : {}),
            }}
            onMouseEnter={() => setIsPlaceOrderHovered(true)}
            onMouseLeave={() => setIsPlaceOrderHovered(false)}
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div style={summaryContainerStyle}>
        <h2 style={{ fontFamily: '"Playfair Display", serif' }}>
          Order Summary
        </h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "15px" }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  marginRight: "10px",
                  borderRadius: "4px",
                }}
              />
              <div>
                <h4
                  style={{
                    margin: "0 0 5px",
                    fontFamily: '"Lato", sans-serif',
                  }}
                >
                  {item.name}
                </h4>
                <p style={{ margin: 0 }}>Quantity: {item.quantity}</p>
                <p style={{ margin: 0 }}>RS. {item.price * item.quantity}</p>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}>
            <h3>Total: RS. {totalPrice}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
