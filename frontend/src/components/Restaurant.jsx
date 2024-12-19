// Restaurant.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Restaurant() {
  const [products, setProducts] = useState([]); // Replaces productsData
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const navigate = useNavigate(); // Initialize useNavigate

  const categories = [
    "All",
    "Desi",
    "Chinese",
    "Continental",
    "Beverages",
    "African-American", // Corrected spelling
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/"); // Adjust the base URL as needed
        setProducts(response.data.data); // Assuming the backend sends { success: true, data: [...] }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1, id: product._id }, // Ensure unique identifier
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItemsInCart = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  // Inline styles
  const appContainerStyle = {
    minHeight: "100vh",
    background: "#fafafa",
    padding: "20px",
    position: "relative",
    minHeight: "100vh",
    fontFamily: '"Lato", sans-serif',
    paddingTop: "100px", // Increase this value as needed
  };

  const categoryTabsStyle = {
    marginBottom: "20px",
    display: "flex",
    flexWrap: "wrap",
  };

  const categoryButtonStyle = (isActive) => ({
    background: isActive ? "#b10101" : "#fff",
    color: isActive ? "#fff" : "#000",
    border: "1px solid #b10101",
    borderRadius: "4px",
    padding: "8px 12px",
    marginRight: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: '"Playfair Display", serif',
  });

  const categoryButtonHoverStyle = {
    background: "#b10101",
    color: "#fff",
  };

  const cartIconContainerStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    cursor: "pointer",
    zIndex: 101,
    paddingTop: "100px", // Increase this value as needed
  };

  const cartIconStyle = {
    position: "relative",
    display: "inline-block",
    width: "32px",
    height: "32px",
    color: "#b10101", // Matching color
  };

  const cartBadgeStyle = {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "4px 8px",
    fontSize: "12px",
  };

  // Adjusted Product Grid Style
  const productGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Reduced min width
    gap: "35px", // Reduced gap
    justifyItems: "center",
    marginTop: "20px",
    maxWidth: "1600px", // Set max-width to prevent excessive stretching
    margin: "20px auto", // Center the grid container
  };

  const productCardStyle = {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center", // Center content horizontally
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "300px", // Fixed width for cards
    height: "400px", // Fixed height for cards
    overflow: "hidden", // Prevent image overflow
    boxSizing: "border-box", // Include padding and borders in dimensions
  };

  const productCardHoverStyle = {
    transform: "translateY(-3px) scale(1.01)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  };

  const heartIconContainerStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  const heartIconStyle = {
    width: "24px",
    height: "24px",
  };

  const productImageStyle = {
    width: "100%", // Ensure image fits the card width
    height: "200px", // Fixed height for the image
    objectFit: "contain", // Display the full image without cropping
    display: "block", // Removes any inline spacing issues
    margin: "0 auto", // Center the image horizontally
    backgroundColor: "#f8f8f8", // Optional: clean background for empty space
  };

  const productTitleStyle = {
    margin: "10px 0 5px",
    fontSize: "1.1em",
    fontFamily: '"Playfair Display", serif',
  };

  const productDescriptionStyle = {
    margin: "0 0 10px",
    color: "#555",
    fontSize: "0.9em",
  };

  const productPriceStyle = {
    fontWeight: "bold",
    marginBottom: "10px",
  };

  // For the add-to-cart button animations, we adjust style based on state
  const addToCartButtonStyle = (isHovered, isActiveBtn) => ({
    background: isHovered ? "#d40f0f" : "#b10101",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1.2em",
    transition: "transform 0.3s ease, background 0.3s ease",
    transform: isHovered
      ? "perspective(500px) rotateY(-10deg)"
      : isActiveBtn
      ? "scale(0.95)"
      : "none",
  });

  const cartDrawerStyle = {
    position: "fixed",
    top: 0,
    right: isCartOpen ? "0" : "-320px",
    width: "320px",
    height: "100%",
    background: "#fff",
    boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 200,
    transition: "right 0.4s ease",
    display: "flex",
    flexDirection: "column",
    paddingTop: "100px",
  };

  const cartHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const closeCartButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "1.5em",
    cursor: "pointer",
    color: "#b10101",
  };

  const cartContentStyle = {
    flex: 1,
    overflowY: "auto",
  };

  const cartItemStyle = {
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  };

  const cartItemTitleStyle = {
    margin: "5px 0",
    fontFamily: '"Playfair Display", serif',
  };

  const cartItemPriceStyle = {
    margin: "5px 0",
    fontSize: "0.9em",
    color: "#444",
  };

  const cartItemControlsStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  };

  const quantityButtonStyle = {
    margin: "0 10px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    background: "#ddd",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.2em",
    fontWeight: "bold",
  };

  const itemQuantityStyle = {
    fontSize: "1em",
  };

  const removeItemButtonStyle = {
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "0.9em",
  };

  const cartTotalStyle = {
    marginTop: "20px",
    fontSize: "1.1em",
    fontWeight: "bold",
  };

  const cartOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 100,
    cursor: "pointer",
  };

  // Additional styles for the Checkout button
  const checkoutButtonStyle = {
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

  const checkoutButtonHoverStyle = {
    background: "#d40f0f",
  };

  // State to handle hover effect on Checkout button
  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);

  return (
    <div style={appContainerStyle}>
      <Helmet>
        <title>Wasna Palace - Make Your Event Memorable</title>
        <meta
          name="description"
          content="Plan your next big event at Wasna Palace. Offering premium event management with world-class facilities."
        />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Category Tabs */}
      <div style={categoryTabsStyle}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={{
              ...categoryButtonStyle(selectedCategory === cat),
              ...(hoveredButton === cat ? categoryButtonHoverStyle : {}),
            }}
            onClick={() => setSelectedCategory(cat)}
            onMouseEnter={() => setHoveredButton(cat)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cart Button */}
      <div
        style={cartIconContainerStyle}
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <div style={cartIconStyle}>
          <FaShoppingCart size={32} color="#b10101" />
          {totalItemsInCart > 0 && (
            <span style={cartBadgeStyle}>{totalItemsInCart}</span>
          )}
        </div>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        /* Product Listing */
        <div style={productGridStyle}>
          {filteredProducts.map((product) => {
            const isHovered = hoveredButton === product._id;
            const isActiveBtn = activeButton === product._id;

            return (
              <div
                key={product._id}
                style={{
                  ...productCardStyle,
                  ...(isHovered ? productCardHoverStyle : {}),
                }}
              >
                <div style={heartIconContainerStyle}>
                  <img
                    src="https://via.placeholder.com/24?text=♥"
                    alt="Favorite"
                    style={heartIconStyle}
                  />
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  style={productImageStyle}
                />
                <h3 style={productTitleStyle}>{product.name}</h3>
                <p style={productDescriptionStyle}>{product.description}</p>
                <p style={productPriceStyle}>RS. {product.price}</p>
                <button
                  style={addToCartButtonStyle(isHovered, isActiveBtn)}
                  onClick={() => addToCart(product)}
                  onMouseEnter={() => setHoveredButton(product._id)}
                  onMouseLeave={() => {
                    setHoveredButton(null);
                    setActiveButton(null);
                  }}
                  onMouseDown={() => setActiveButton(product._id)}
                  onMouseUp={() => setActiveButton(null)}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Drawer */}
      <div style={cartDrawerStyle}>
        <div style={cartHeaderStyle}>
          <h2
            style={{
              margin: 0,
              fontFamily: '"Playfair Display", serif',
              fontSize: "1.5em",
            }}
          >
            Cart
          </h2>
          <button
            style={closeCartButtonStyle}
            onClick={() => setIsCartOpen(false)}
          >
            ×
          </button>
        </div>
        <div style={cartContentStyle}>
          {cart.length === 0 && <p>No items in cart.</p>}
          {cart.map((item) => (
            <div key={item.id} style={cartItemStyle}>
              {/* Display Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
              <div style={{ display: "inline-block", verticalAlign: "top" }}>
                <h4 style={cartItemTitleStyle}>{item.name}</h4>
                <p style={cartItemPriceStyle}>Price: RS. {item.price}</p>
                <div style={cartItemControlsStyle}>
                  <button
                    style={quantityButtonStyle}
                    onClick={() => decrementQuantity(item.id)}
                  >
                    -
                  </button>
                  <span style={itemQuantityStyle}>{item.quantity}</span>
                  <button
                    style={quantityButtonStyle}
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  style={removeItemButtonStyle}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <div style={cartTotalStyle}>
                <h3 style={{ margin: 0 }}>Total: RS. {totalPrice}</h3>
              </div>
              {/* Checkout Button */}
              <button
                style={{
                  ...checkoutButtonStyle,
                  ...(isCheckoutHovered ? checkoutButtonHoverStyle : {}),
                }}
                onClick={() =>
                  navigate("/checkout", { state: { cart, totalPrice } })
                }
                onMouseEnter={() => setIsCheckoutHovered(true)}
                onMouseLeave={() => setIsCheckoutHovered(false)}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>

      {isCartOpen && (
        <div
          style={cartOverlayStyle}
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Restaurant;
