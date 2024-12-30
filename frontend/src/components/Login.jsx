import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation and useNavigate
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    phoneNumber: "", // For both login and signup
    password: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });
  const [error, setError] = useState(null); // For error messages
  const navigate = useNavigate(); // Hook to navigate to another page
  const location = useLocation(); // Hook to get the current location (page the user is on)

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (Login or Signup)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:4000/api/v1/login"
      : "http://localhost:4000/api/v1/register"; // API URLs for login and signup

    const payload = isLogin
      ? {
          phoneNumber: formData.phoneNumber, // Login uses phone number and password
          password: formData.password,
        }
      : {
          fullName: formData.fullName, // Signup includes more details
          email: formData.email,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
        };

    try {
      const response = await axios.post(url, payload); // Send the API request
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store the token

        // After login/signup, redirect to the previous page or the home page if none exists
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo); // Redirect to the previous page
      }
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred"); // Show error message
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authBox}>
        <h2 style={styles.header}>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Render signup fields if not in login mode */}
          {!isLogin && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="fullName" style={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="dateOfBirth" style={styles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="gender" style={styles.label}>
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="phoneNumber" style={styles.label}>
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </>
          )}

          {/* Render login fields if in login mode */}
          {isLogin && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="phoneNumber" style={styles.label}>
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </>
          )}

          <button type="submit" style={styles.submitButton}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div style={styles.toggleAuth}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={styles.toggleButton}
          >
            {isLogin ? "Create an Account" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  authBox: {
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "400px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
  toggleAuth: {
    textAlign: "center",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#4caf50",
    cursor: "pointer",
  },
};

export default Login;
