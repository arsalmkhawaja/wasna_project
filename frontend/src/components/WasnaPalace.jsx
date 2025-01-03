import React, { useState, useEffect } from "react";
import axios from "axios"; // For API calls
import { Helmet } from "react-helmet";
import { Button, Typography, Box, TextField } from "@mui/material";
import eventOptions from "../Data/Events";
import menus from "../Data/MenuData";
import decorOptions from "../Data/DecorOptions";
import photographyPackages from "../Data/PhotographyPackages";

const WasnaPalace = () => {
  const styles = {
    bookingPage: {
      fontFamily: '"Playfair Display", serif',
      textAlign: "center",
      padding: "20px",
      minHeight: "100vh",
      marginTop: "100px",
      overflow: "hidden",
    },
    heading: {
      fontSize: "36px",
      margin: "20px 0",
      fontWeight: "bold",
      color: "#d4a373",
    },
    progressBarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      margin: "20px auto",
      position: "relative",
      height: "40px", // Ensure space for the circles and line
    },
    progressLine: {
      position: "absolute",
      top: "30%", // Align the line with the center of the circles
      left: "5%",
      right: "5%",
      height: "4px",
      background: "#eaeaea",
      transform: "translateY(-50%)", // Ensure it's centered vertically
    },
    activeLine: (activeStep) => ({
      position: "absolute",
      top: "30%", // Align with the circles
      left: "5%",
      height: "4px",
      background: "#c00",
      width: `${18 * (activeStep - 1)}%`, // Adjust width based on active step
      transform: "translateY(-50%)", // Keep it aligned vertically
    }),
    stepContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
      position: "relative",
    }),
    stepLabel: (isActive) => ({
      fontSize: "12px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#c00" : "#aaa",
      marginTop: "8px",
    }),
    form: {
      fontFamily: '"Playfair Display", serif',
      display: "inline-block",
      width: "80%",
      marginTop: "40px",
      transition: "transform 0.5s ease",
    },
    card: (isSelected) => ({
      width: "80%",
      padding: "20px",
      margin: "20px auto",
      borderRadius: "12px",
      background: isSelected ? "rgba(212, 163, 115, 0.2)" : "#fff", // Lightened golden background
      backdropFilter: "blur(15px)", // Increased blur effect
      border: isSelected ? "2px solid #c00" : "2px solid transparent",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center",
      fontFamily: '"Playfair Display", serif',
    }),

    cardText: {
      fontSize: "25px",
      fontWeight: "bold",
      color: "#d4a373",
      fontFamily: '"Playfair Display", serif',
      // textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7)",
    },
    priceText: {
      fontSize: "20px",
      color: "#d4a373",
      fontFamily: '"Playfair Display", serif',
    },
    descriptionText: {
      fontSize: "14px",
      color: "#b10101",
      fontFamily: '"Playfair Display", serif',
    },
    textArea: {
      width: "100%",
      marginTop: "20px",
      marginBottom: "20px",
    },
    subEventContainer: {
      marginTop: "20px",
      textAlign: "left",
    },
    subEventHeading: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#c00",
      marginBottom: "10px",
      fontFamily: '"Playfair Display", serif',
    },
  };

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: "",
    subEvents: {},
    decor: "",
    photography: "",
    menuRemarks: "",
    decorRemarks: "",
    photographyRemarks: "",
    confirmationRemarks: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check login status
  const [userReceipts, setUserReceipts] = useState([]); // Store user receipts
  const [currentSubEvent, setCurrentSubEvent] = useState("");

  useEffect(() => {
    const checkLoginAndFetchReceipts = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
        if (token) {
          setIsLoggedIn(true);

          // Fetch user receipts
          const response = await axios.get("http://localhost:4000/api/v2/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserReceipts(response.data);
        }
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    checkLoginAndFetchReceipts();
  }, []);

  const handleSelect = (field, value) => {
    if (field === "subEvents") {
      const updatedSubEvents = { ...formData.subEvents };
      if (updatedSubEvents[value]) {
        delete updatedSubEvents[value];
      } else {
        updatedSubEvents[value] = [];
      }
      setFormData({ ...formData, subEvents: updatedSubEvents });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleMenuSelect = (subEvent, menu) => {
    const updatedSubEvents = { ...formData.subEvents };
    if (!updatedSubEvents[subEvent]) updatedSubEvents[subEvent] = [];
    const menuIndex = updatedSubEvents[subEvent].findIndex(
      (m) => m.name === menu.name
    );

    if (menuIndex > -1) {
      updatedSubEvents[subEvent].splice(menuIndex, 1);
    } else {
      updatedSubEvents[subEvent].push(menu);
    }

    setFormData({ ...formData, subEvents: updatedSubEvents });
    calculateTotalPrice(updatedSubEvents, formData.decor, formData.photography);
  };
  const resetCurrentStep = (step) => {
    switch (step) {
      case 2: // Reset Sub-Events
        setFormData((prev) => ({
          ...prev,
          subEvents: {},
        }));
        break;
      case 3: // Reset Menu
        setFormData((prev) => ({
          ...prev,
          subEvents: {}, // Clear menu selections for all sub-events
          menuRemarks: "",
        }));
        setCurrentSubEvent("");
        break;
      case 4: // Reset Decor
        setFormData((prev) => ({
          ...prev,
          decor: "",
          decorRemarks: "",
        }));
        break;
      case 5: // Reset Photography
        setFormData((prev) => ({
          ...prev,
          photography: "",
          photographyRemarks: "",
        }));
        break;
      default:
        break;
    }

    // Recalculate total price after resetting
    calculateTotalPrice(
      formData.subEvents,
      step === 4 ? "" : formData.decor, // Reset decor if step is 4
      step === 5 ? "" : formData.photography // Reset photography if step is 5
    );
  };
  const calculateTotalPrice = (updatedSubEvents, decor, photography) => {
    let price = 0;

    Object.values(updatedSubEvents).forEach((menus) => {
      menus.forEach((menu) => {
        price += menu.price;
      });
    });

    if (decor) {
      const decorOption = decorOptions.find((d) => d.name === decor);
      if (decorOption) price += decorOption.price;
    }

    if (photography) {
      const photographyOption = photographyPackages.find(
        (p) => p.name === photography
      );
      if (photographyOption) price += photographyOption.price;
    }

    setTotalPrice(price);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
      if (!token) {
        alert("Please log in to confirm your booking.");
        return;
      }

      // Decode token to extract user details (if applicable)
      const user = JSON.parse(atob(token.split(".")[1])); // Decode payload of JWT token (ensure it has user info)
      const receiptData = {
        user: user._id || user.id, // Use the user ID from token (adjust based on your backend)
        eventType: formData.eventType,
        subEvents: Object.keys(formData.subEvents),
        menus: Object.values(formData.subEvents)
          .flat()
          .map((menu) => menu.name),
        decor: formData.decor,
        photographyPackages: formData.photography ? [formData.photography] : [],
        menuRemarks: formData.menuRemarks,
        decorRemarks: formData.decorRemarks,
        photographyPackagesRemarks: formData.photographyPackages,
        additionalRemarks: formData.additionalRemarks,
        totalPrice: totalPrice, // Include the total price
        additionalCharges: 0, // Add any additional charges if applicable
      };

      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:4000/api/v2/", // Adjust this URL if necessary
        receiptData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking confirmed successfully!");
      setUserReceipts([...userReceipts, response.data]); // Update the user's receipts
      setActiveStep(1); // Reset the form
      setFormData({
        eventType: "",
        subEvents: {},
        decor: "",
        photography: "",
        menuRemarks: "",
        decorRemarks: "",
        photographyRemarks: "",
        additionalRemarks: "",
      });
      setTotalPrice(0);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };

  const renderForm = () => {
    switch (activeStep) {
      case 1:
        return (
          <Box>
            {Object.entries(eventOptions).map(
              ([eventType, { description }]) => (
                <Box
                  key={eventType}
                  style={styles.card(formData.eventType === eventType)}
                  onClick={() => handleSelect("eventType", eventType)}
                >
                  <Typography style={styles.cardText}>{eventType}</Typography>
                  <Typography style={styles.descriptionText}>
                    {description}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            {Object.entries(
              eventOptions[formData.eventType]?.subEvents || {}
            ).map(([subEvent, description]) => (
              <Box
                key={subEvent}
                style={styles.card(formData.subEvents[subEvent])}
                onClick={() => handleSelect("subEvents", subEvent)}
              >
                <Typography style={styles.cardText}>{subEvent}</Typography>
                <Typography style={styles.descriptionText}>
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      case 3:
        return (
          <Box>
            {/* Display list of sub-events to select */}
            <Box>
              {Object.keys(formData.subEvents).map((subEvent) => (
                <Box
                  key={subEvent}
                  style={styles.card(currentSubEvent === subEvent)}
                  onClick={() => setCurrentSubEvent(subEvent)} // Set the current sub-event
                >
                  <Typography style={styles.cardText}>{subEvent}</Typography>
                </Box>
              ))}
            </Box>

            {/* Show menus only for the currently selected sub-event */}
            {currentSubEvent && (
              <Box style={{ marginTop: "20px" }}>
                <Typography style={styles.subEventHeading}>
                  {currentSubEvent} - Select Menu
                </Typography>
                {(menus[currentSubEvent] || []).map((menu) => (
                  <Box
                    key={menu.name}
                    style={styles.card(
                      formData.subEvents[currentSubEvent]?.find(
                        (m) => m.name === menu.name
                      )
                    )}
                    onClick={() => handleMenuSelect(currentSubEvent, menu)}
                  >
                    <Typography style={styles.cardText}>{menu.name}</Typography>

                    {/* Render description items as separate lines */}
                    {menu.description && Array.isArray(menu.description) && (
                      <Box style={{ marginTop: "10px" }}>
                        {menu.description.map((desc, index) => (
                          <Typography
                            key={index}
                            style={styles.descriptionText}
                          >
                            {desc}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    <Typography style={styles.priceText}>
                      Price: RS. {menu.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Additional Remarks */}
            <Box style={{ marginTop: "20px" }}>
              <TextField
                label="Additional Remarks for Menu"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={styles.textArea}
                value={formData.menuRemarks}
                onChange={(e) => handleSelect("menuRemarks", e.target.value)}
              />
            </Box>
          </Box>
        );

      case 4:
        return (
          <Box>
            {decorOptions.map((decor) => (
              <Box
                key={decor.name}
                style={styles.card(formData.decor === decor.name)}
                onClick={() => {
                  handleSelect("decor", decor.name);
                  calculateTotalPrice(
                    formData.subEvents,
                    decor.name,
                    formData.photography
                  );
                }}
              >
                <Typography style={styles.cardText}>{decor.name}</Typography>
                <Typography style={styles.priceText}>
                  Price: RS. {decor.price}
                </Typography>
              </Box>
            ))}
            {/* Additional Remarks */}
            <Box style={{ marginTop: "20px" }}>
              <TextField
                label="Additional Remarks for Decor"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={styles.textArea}
                value={formData.decorRemarks}
                onChange={(e) => handleSelect("decorRemarks", e.target.value)}
              />
            </Box>
          </Box>
        );
      case 5:
        return (
          <Box>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                color: "#c00",
                marginBottom: "10px",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Select Photography Package
            </Typography>

            {photographyPackages.map((packageType) => (
              <Box key={packageType.type}>
                <Typography variant="h6" style={styles.subEventHeading}>
                  {packageType.type} Packages
                </Typography>

                {packageType.packages.map((pkg) => (
                  <Box
                    key={pkg.name}
                    style={styles.card(formData.photography === pkg.name)}
                    onClick={() => handleSelect("photography", pkg.name)}
                  >
                    <Typography style={styles.cardText}>{pkg.name}</Typography>

                    {pkg.description && Array.isArray(pkg.description) && (
                      <Box style={{ marginTop: "10px" }}>
                        {pkg.description.map((desc, index) => (
                          <Typography
                            key={index}
                            style={styles.descriptionText}
                          >
                            {desc}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    <Typography style={styles.priceText}>
                      Price: RS. {pkg.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}

            {/* Additional Remarks */}
            <Box style={{ marginTop: "20px" }}>
              <TextField
                label="Additional Remarks for Photography"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={styles.textArea}
                value={formData.photographyRemarks}
                onChange={(e) =>
                  handleSelect("photographyRemarks", e.target.value)
                }
              />
            </Box>
          </Box>
        );

      case 6:
        return (
          <Box>
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#c00",
              }}
            >
              Review Your Booking Details
            </Typography>
            <Box
              style={{
                padding: "20px",
                background: "#f7f7f7",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                {/* Event Type */}
                <li style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#c00" }}>Event Type:</span>{" "}
                    {formData.eventType}
                  </Typography>
                </li>

                {/* Sub-Events */}
                <li style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#c00" }}>Sub-Events:</span>
                  </Typography>
                  {Object.keys(formData.subEvents).map((subEvent) => (
                    <Box key={subEvent} style={{ marginTop: "10px" }}>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold", color: "#333" }}
                      >
                        {subEvent}
                      </Typography>
                      <Box style={{ paddingLeft: "20px" }}>
                        {formData.subEvents[subEvent].map((menu) => (
                          <div key={menu.name} style={{ marginBottom: "10px" }}>
                            <Typography
                              variant="body2"
                              style={{ color: "#555" }}
                            >
                              <strong>{menu.name}</strong> - Price:{" "}
                              <span style={{ color: "#d4a373" }}>
                                RS. {menu.price}
                              </span>
                            </Typography>
                          </div>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </li>

                {/* Decor */}
                <li style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#c00" }}>Decor:</span>
                    {formData.decor ? (
                      <>
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {formData.decor}
                        </span>
                        - Price:{" "}
                        <span style={{ color: "#d4a373" }}>
                          RS.{" "}
                          {
                            decorOptions.find((d) => d.name === formData.decor)
                              ?.price
                          }
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>Not selected</span>
                    )}
                  </Typography>
                </li>

                {/* Photography */}
                <li style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#c00" }}>Photography:</span>
                    {formData.photography ? (
                      <>
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {formData.photography}
                        </span>
                        - Price:{" "}
                        <span style={{ color: "#d4a373" }}>
                          RS.{" "}
                          {
                            photographyPackages.find(
                              (p) => p.name === formData.photography
                            )?.price
                          }
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>Not selected</span>
                    )}
                  </Typography>
                </li>

                {/* Total Price */}
                <li>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#c00" }}>Total Price:</span>
                    <span style={{ color: "#d4a373", fontWeight: "bold" }}>
                      RS. {totalPrice}
                    </span>
                  </Typography>
                </li>
              </ul>
            </Box>

            {/* Additional Remarks */}
            <Box style={{ marginTop: "20px" }}>
              <TextField
                label="Additional Remarks"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={styles.textArea}
                value={formData.additionalRemarks}
                onChange={(e) =>
                  handleSelect("additionalRemarks", e.target.value)
                }
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div style={styles.bookingPage}>
        <Helmet>
          <title>Wasna Palace - Book Your Event</title>
        </Helmet>
        <h1 style={styles.heading}>Book Now</h1>
        <div style={styles.progressBarContainer}>
          <div style={styles.progressLine}></div>
          <div style={styles.activeLine(activeStep)}></div>
          {[
            "Event Type",
            "Sub-Event",
            "Menu",
            "Decor",
            "Photography",
            "Confirmation",
          ].map((label, index) => (
            <div key={index} style={styles.stepContainer}>
              <div style={styles.stepCircle(index + 1 === activeStep)}>
                {index + 1}
              </div>
              <div style={styles.stepLabel(index + 1 === activeStep)}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <form style={styles.form}>{renderForm()}</form>
        <div>
          {activeStep > 1 && (
            <Button
              variant="contained"
              onClick={() => {
                resetCurrentStep(activeStep); // Reset current step options
                setActiveStep((prev) => prev - 1); // Move to the previous step
              }}
              style={{ marginRight: "10px", backgroundColor: "#d4a373" }}
            >
              Back
            </Button>
          )}
          {/* Next Button */}
          {activeStep < 6 ? (
            <Button
              variant="contained"
              onClick={() => setActiveStep((prev) => prev + 1)}
              style={{ backgroundColor: "#d4a373" }}
            >
              Next →
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "#d4a373" }}
              onClick={() => handleSubmit()}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasnaPalace;
