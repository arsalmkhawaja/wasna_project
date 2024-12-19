import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar"; // Import the Navbar component
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";

const WasnaPalace = () => {
  // Inline styles for the page
  const styles = {
    bookingPage: {
      fontFamily: '"Playfair Display", serif',
      textAlign: "center",
      padding: "20px",
      minHeight: "100vh",
      top: "1rem",
      marginTop: "60px", // Adjust margin for space below the navbar
    },
    progressBarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: "20px auto",
      position: "relative",
    },
    progressLine: {
      position: "absolute",
      top: "35%",
      left: "5%",
      right: "5%",
      height: "4px",
      background: "#eaeaea",
      zIndex: 0,
    },
    activeLine: (activeStep) => ({
      position: "absolute",
      top: "35%",
      left: "5%",
      height: "4px",
      background: "#c00",
      zIndex: 1,
      width: `${31 * (activeStep - 1)}%`, // Dynamically update width based on step
    }),
    stepContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      zIndex: 2,
    },
    stepCircle: (isActive) => ({
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: isActive ? "#c00" : "#eaeaea",
      color: isActive ? "#fff" : "#aaa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      border: isActive ? "2px solid #c00" : "2px solid #ccc",
      fontFamily: '"Playfair Display", serif',
    }),
    stepLabel: (isActive) => ({
      fontSize: "12px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#c00" : "#aaa",
      marginTop: "8px",
      fontFamily: '"Playfair Display", serif',
    }),
    heading: {
      fontSize: "2rem",
      margin: "20px 0",
      fontWeight: "bold",
      color: "#b8860b", // Gold color
      fontFamily: '"Playfair Display", serif',
    },
    form: {
      display: "inline-block",
      width: "300px",
      fontFamily: '"Playfair Display", serif',
    },
    formGroup: {
      margin: "20px 0",
      textAlign: "left",
      width: "100%",
      fontFamily: '"Playfair Display", serif',
    },
    formControl: {
      width: "100%",
      textAlign: "left",
      fontFamily: '"Playfair Display", serif',
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#c00",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      fontFamily: '"Playfair Display", serif',
    },
  };

  // State for dropdown values
  const [activeStep, setActiveStep] = useState(1); // Track the current step
  const [formData, setFormData] = useState({
    eventType: "",
    venue: "",
    date: "",
    foodMenu: "",
    decor: "",
  });

  // Handle step navigation
  const handleNext = () => {
    if (activeStep < 4) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderForm = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <FormControl style={styles.formControl}>
              <InputLabel>Select Event Type</InputLabel>
              <Select
                value={formData.eventType}
                onChange={(e) => handleChange("eventType", e.target.value)}
              >
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Select Venue</InputLabel>
              <Select
                value={formData.venue}
                onChange={(e) => handleChange("venue", e.target.value)}
              >
                <MenuItem value="Hall A">Hall A</MenuItem>
                <MenuItem value="Hall B">Hall B</MenuItem>
                <MenuItem value="Hall C">Hall C</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel>Choose Date(s)</InputLabel>
              <Select
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
              >
                <MenuItem value="2024-01-01">1st January 2024</MenuItem>
                <MenuItem value="2024-02-15">15th February 2024</MenuItem>
                <MenuItem value="2024-03-20">20th March 2024</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (
          <FormControl style={styles.formControl}>
            <InputLabel>Food Menu</InputLabel>
            <Select
              value={formData.foodMenu}
              onChange={(e) => handleChange("foodMenu", e.target.value)}
            >
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
              <MenuItem value="Mixed">Mixed</MenuItem>
            </Select>
          </FormControl>
        );
      case 3:
        return (
          <FormControl style={styles.formControl}>
            <InputLabel>Decor Theme</InputLabel>
            <Select
              value={formData.decor}
              onChange={(e) => handleChange("decor", e.target.value)}
            >
              <MenuItem value="Traditional">Traditional</MenuItem>
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Rustic">Rustic</MenuItem>
            </Select>
          </FormControl>
        );
      case 4:
        return (
          <Typography variant="h6">
            Please review your details and confirm your booking:
            <ul>
              <li>Event Type: {formData.eventType}</li>
              <li>Venue: {formData.venue}</li>
              <li>Date: {formData.date}</li>
              <li>Food Menu: {formData.foodMenu}</li>
              <li>Decor Theme: {formData.decor}</li>
            </ul>
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Booking Page Content */}
      <div style={styles.bookingPage}>
        {/* SEO Meta Tags */}
        <Helmet>
          <title>Wasna Palace - Make Your Event Memorable</title>
          <meta
            name="description"
            content="Plan your next big event at Wasna Palace. Offering premium event management with world-class facilities."
          />
        </Helmet>
        <h1 style={styles.heading}>Book Now</h1>

        {/* Progress Bar */}
        <div style={styles.progressBarContainer}>
          {/* Background Line */}
          <div style={styles.progressLine}></div>
          {/* Active Line */}
          <div style={styles.activeLine(activeStep)}></div>

          {/* Steps */}
          {["Choose Event", "Food Menu", "Decor", "Confirmation"].map(
            (label, index) => {
              const isActive = index + 1 === activeStep;
              return (
                <div key={index} style={styles.stepContainer}>
                  <div style={styles.stepCircle(isActive)}>{index + 1}</div>
                  <div style={styles.stepLabel(isActive)}>{label}</div>
                </div>
              );
            }
          )}
        </div>

        {/* Form Section */}
        <form style={styles.form}>
          {renderForm()}
          <div style={{ marginTop: "20px" }}>
            {activeStep > 1 && (
              <Button
                variant="contained"
                onClick={handleBack}
                style={{
                  marginRight: "10px",
                  fontFamily: '"Playfair Display", serif',
                  backgroundColor: "#d4a373",
                }}
              >
                Back
              </Button>
            )}
            {activeStep < 4 ? (
              <Button
                style={{
                  marginRight: "10px",
                  fontFamily: '"Playfair Display", serif',
                  backgroundColor: "#d4a373",
                }}
                variant="contained"
                onClick={handleNext}
              >
                Next →
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  marginRight: "10px",
                  fontFamily: '"Playfair Display", serif',
                  backgroundColor: "#d4a373",
                }}
              >
                Confirm
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WasnaPalace;
