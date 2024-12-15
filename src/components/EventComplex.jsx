import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar"; // Import the Navbar component
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

const BookingPage = () => {
  // Inline styles for the page
  const styles = {
    bookingPage: {
      fontFamily: "Arial, sans-serif",
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
      top: "50%",
      left: "5%",
      right: "5%",
      height: "4px",
      background: "#eaeaea",
      zIndex: 0,
    },
    activeLine: {
      position: "absolute",
      top: "50%",
      left: "5%",
      height: "4px",
      background: "#c00",
      zIndex: 1,
      width: "25%", // Adjust this percentage based on the active step
    },
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
    }),
    stepLabel: (isActive) => ({
      fontSize: "12px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#c00" : "#aaa",
      marginTop: "8px",
    }),
    heading: {
      fontSize: "2rem",
      margin: "20px 0",
      fontWeight: "bold",
      color: "#b8860b", // Gold color
    },
    form: {
      display: "inline-block",
      width: "300px",
    },
    formGroup: {
      margin: "20px 0",
      textAlign: "left",
      width: "100%",
    },
    formControl: {
      width: "100%",
      textAlign: "left",
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
    },
  };

  // State for dropdown values
  const [eventType, setEventType] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [date, setDate] = React.useState("");

  const activeStep = 1; // Set the current active step

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
          <div style={styles.activeLine}></div>

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
          <div style={styles.formGroup}>
            <FormControl style={styles.formControl}>
              <InputLabel>Select Event Type</InputLabel>
              <Select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Birthday">Birthday</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={styles.formGroup}>
            <FormControl style={styles.formControl}>
              <InputLabel>Select Venue</InputLabel>
              <Select value={venue} onChange={(e) => setVenue(e.target.value)}>
                <MenuItem value="Hall A">Hall A</MenuItem>
                <MenuItem value="Hall B">Hall B</MenuItem>
                <MenuItem value="Hall C">Hall C</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={styles.formGroup}>
            <FormControl style={styles.formControl}>
              <InputLabel>Choose Date(s)</InputLabel>
              <Select value={date} onChange={(e) => setDate(e.target.value)}>
                <MenuItem value="2024-01-01">1st January 2024</MenuItem>
                <MenuItem value="2024-02-15">15th February 2024</MenuItem>
                <MenuItem value="2024-03-20">20th March 2024</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button variant="contained" color="primary" style={styles.button}>
            Next →
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
