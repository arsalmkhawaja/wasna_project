import React, { useState, useEffect } from "react";
import axios from "axios"; // For API calls
import { Helmet } from "react-helmet";
import { Button, Typography, Box, TextField } from "@mui/material";
import eventOptions from "../Data/Events";
import menus from "../Data/MenuData";
import decorOptions from "../Data/DecorOptions";
import photographyPackages from "../Data/PhotographyPackages";
import bgImage from "../assets/Background.jpg";

const WasnaPalace = () => {
  const styles = {
    bookingPage: {
      fontFamily: '"Americana", regular',
      textAlign: "center",
      minHeight: "100vh",
      marginTop: "75px",
      overflow: "hidden",
      position: "relative", // Required for the overlay div
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    },

    // New overlay style for the blurred effect
    blurOverlay: {
      content: '""',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: "100vh",
      background: "rgba(0, 0, 0, 0.2)", // Dark overlay
      backdropFilter: "blur(3px)", // Apply the blur effect
    },

    heading: {
      fontSize: "56px",
      margin: "20px 10px",
      paddingTop: "40px",
      paddingBottom: "50px",
      fontWeight: "bold",
      color: "#3d0420",
      fontFamily: '"Americana", regular',
      textShadow: "4px 4px 10px rgba(0, 0, 0, 1)",
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
      top: "17%", // Align the line with the center of the circles
      left: "5%",
      right: "5%",
      height: "4px",
      background: "#adaaaa",
      transform: "translateY(-50%)", // Center it vertically
      boxShadow: "0 4px 8px rgba(0, 0, 0, 1)", // Add shadow to the line
    },

    activeLine: (activeStep) => ({
      position: "absolute",
      top: "17%", // Align with the circles
      left: "5%",
      height: "4px",
      background: "#3d0420",
      width: `${(88 / 5) * (activeStep - 1)}%`, // Divide the progress line into 6 steps
      transform: "translateY(-50%)", // Keep it aligned vertically
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Add shadow to the active line
    }),

    stepContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    stepCircle: (isActive) => ({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: isActive ? "#3d0420" : "#eaeaea",
      color: isActive ? "#fff" : "#aaa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "30px",
      fontWeight: "bold",
      border: isActive ? "2px solid #3d0420" : "2px solid #ccc",
      position: "relative",
      boxShadow: isActive
        ? "0 4px 8px rgba(0, 0, 0, 1)"
        : "0 4px 8px rgba(0, 0, 0, 0.5)",
    }),

    stepLabel: (isActive) => ({
      fontSize: "20px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#3d0420" : "#aaa",
      marginTop: "8px",
      textShadow: "0 4px 8px rgba(0, 0, 0, 1)",
    }),
    form: {
      fontFamily: '"Americana", regular',
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
      background: isSelected ? "rgba(61, 4, 32, 0.9)" : "#fff", // Lightened golden background
      backdropFilter: "blur(5px)", // Increased blur effect
      border: isSelected ? "2px solid #3d0420" : "2px solid transparent",
      // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center",
    }),

    cardText: {
      fontSize: "35px",
      fontWeight: "bold",
      color: "#d4a373",
      fontFamily: '"Americana", regular',
      // textShadow: "2px 4px 4px rgba(0, 0, 0, 0.7)",
    },
    priceText: {
      fontSize: "30px",
      color: "#d4a373",
      fontFamily: '"Bank Gothic", sans-serif',
    },
    descriptionText: (isSelected) => ({
      fontSize: "20px",
      color: isSelected ? "#ffffff" : "#3d0420", // Change color to white when selected
      fontFamily: '"Brawler", serif',
    }),
    textArea: {
      width: "100%",
      marginTop: "20px",
      marginBottom: "20px",
      backgroundColor: "white",
    },
    subEventContainer: {
      marginTop: "20px",
      textAlign: "left",
    },
    subEventHeading: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "#3d0420",
      marginBottom: "10px",
      fontFamily: '"Brawler", serif',
    },

    buttonNext: {
      backgroundColor: "#3d0420", // Primary background color
      color: "#ffffff", // Text color
      border: "1px solid transparent", // Border color
      padding: "12px 30px", // Padding for the button
      fontSize: "16px", // Font size
      cursor: "pointer", // Cursor style
      borderRadius: "30px", // Rounded corners
      fontWeight: "600", // Bold font weight
      transition: "background-color 0.3s ease", // Smooth hover transition
      textDecoration: "none", // Remove text decoration (e.g., underlines)
      fontFamily: '"Bank Gothic", sans-serif',
      marginBottom: "10px",
    },

    // Hover effect for the button
    buttonHoverNext: {
      backgroundColor: "#d4a373", // Dark background on hover
    },
    buttonBack: {
      backgroundColor: "#3d0420", // Primary background color
      color: "#ffffff", // Text color
      border: "1px solid transparent", // Border color
      padding: "12px 30px", // Padding for the button
      fontSize: "16px", // Font size
      cursor: "pointer", // Cursor style
      borderRadius: "30px", // Rounded corners
      fontWeight: "600", // Bold font weight
      transition: "background-color 0.3s ease", // Smooth hover transition
      textDecoration: "none", // Remove text decoration (e.g., underlines)
      fontFamily: '"Bank Gothic", sans-serif',
      marginRight: "10px",
      marginBottom: "10px",
    },

    // Hover effect for the button
    buttonHoverBack: {
      backgroundColor: "#d4a373", // Dark background on hover
    },
    buttonConfirm: {
      backgroundColor: "#ae441d", // Primary background color
      color: "#ffffff", // Text color
      border: "1px solid transparent", // Border color
      padding: "12px 30px", // Padding for the button
      fontSize: "16px", // Font size
      cursor: "pointer", // Cursor style
      borderRadius: "30px", // Rounded corners
      fontWeight: "600", // Bold font weight
      transition: "background-color 0.3s ease", // Smooth hover transition
      textDecoration: "none", // Remove text decoration (e.g., underlines)
      fontFamily: '"Bank Gothic", sans-serif',
      marginBottom: "10px",
    },

    // Hover effect for the button
    buttonHoverConfirm: {
      backgroundColor: "#104136", // Dark background on hover
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
  const [menuPrice, setMenuPrice] = useState(0);
  const [eventPrice, setEventPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check login status
  const [userReceipts, setUserReceipts] = useState([]); // Store user receipts
  const [currentSubEvent, setCurrentSubEvent] = useState("");
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [isHoveredBack, setIsHoveredBack] = useState(false);
  const [isHoveredConfirm, setIsHoveredConfirm] = useState(false);

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

      // For wedding events, allow multiple selections
      if (formData.eventType === "Wedding") {
        if (updatedSubEvents[value]) {
          delete updatedSubEvents[value];
        } else {
          updatedSubEvents[value] = [];
        }
      } else {
        // For non-wedding events, only allow one selection
        if (updatedSubEvents[value]) {
          delete updatedSubEvents[value];
        } else {
          // Clear previous selections and set new one
          Object.keys(updatedSubEvents).forEach(
            (key) => delete updatedSubEvents[key]
          );
          updatedSubEvents[value] = [];
        }
      }

      setFormData({ ...formData, subEvents: updatedSubEvents });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleMenuSelect = (subEvent, menu) => {
    const updatedSubEvents = { ...formData.subEvents };
    if (!updatedSubEvents[subEvent]) updatedSubEvents[subEvent] = [];

    // Replace existing menu with new selection
    updatedSubEvents[subEvent] = [menu];

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
    let menuCost = 0;
    let eventCost = 0;

    // Calculate menu prices
    Object.values(updatedSubEvents).forEach((menus) => {
      menus.forEach((menu) => {
        menuCost += menu.addPrice; // Use `menu.price` instead of `menu.addPrice` if `price` is the correct property
      });
    });

    // Calculate decor cost
    if (decor) {
      const decorOption = decorOptions.find((d) => d.name === decor);
      if (decorOption) {
        eventCost += decorOption.price; // Use `price` if that's the correct property
      }
    }

    // Calculate photography cost
    if (photography) {
      for (const packageType of photographyPackages) {
        const foundPackage = packageType.packages.find(
          (pkg) => pkg.name === photography
        );
        if (foundPackage) {
          eventCost += foundPackage.addPrice; // Use `price` if that's the correct property
          break;
        }
      }
    }

    // Update the state with calculated values
    setMenuPrice(menuCost);
    setEventPrice(eventCost);
    setTotalPrice(menuCost + eventCost); // Update the total price
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
              ([eventType, { description }]) => {
                const isSelected = formData.eventType === eventType;
                return (
                  <Box
                    key={eventType}
                    style={styles.card(isSelected)}
                    onClick={() => handleSelect("eventType", eventType)}
                  >
                    <Typography style={styles.cardText}>{eventType}</Typography>
                    <Typography style={styles.descriptionText(isSelected)}>
                      {description}
                    </Typography>
                  </Box>
                );
              }
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            {Object.entries(
              eventOptions[formData.eventType]?.subEvents || {}
            ).map(([subEvent, description]) => {
              const isSelected = Boolean(formData.subEvents[subEvent]);
              return (
                <Box
                  key={subEvent}
                  style={styles.card(isSelected)}
                  onClick={() => handleSelect("subEvents", subEvent)}
                >
                  <Typography style={styles.cardText}>{subEvent}</Typography>
                  <Typography style={styles.descriptionText(isSelected)}>
                    {description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      case 3:
        return (
          <Box>
            {/* Display list of sub-events to select */}
            <Box>
              {Object.keys(formData.subEvents).map((subEvent) => {
                const isSelected = currentSubEvent === subEvent;
                return (
                  <Box
                    key={subEvent}
                    style={styles.card(isSelected)}
                    onClick={() => setCurrentSubEvent(subEvent)}
                  >
                    <Typography style={styles.cardText}>{subEvent}</Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Show menus only for the currently selected sub-event */}
            {currentSubEvent && (
              <Box style={{ marginTop: "20px" }}>
                <Typography style={styles.subEventHeading}>
                  {currentSubEvent} - Select Menu
                </Typography>
                {(menus[currentSubEvent] || []).map((menu) => {
                  const isSelected = Boolean(
                    formData.subEvents[currentSubEvent]?.find(
                      (m) => m.name === menu.name
                    )
                  );
                  return (
                    <Box
                      key={menu.name}
                      style={styles.card(isSelected)}
                      onClick={() => handleMenuSelect(currentSubEvent, menu)}
                    >
                      <Typography style={styles.cardText}>
                        {menu.name}
                      </Typography>

                      {/* Render description items as separate lines */}
                      {menu.description && Array.isArray(menu.description) && (
                        <Box style={{ marginTop: "10px" }}>
                          {menu.description.map((desc, index) => (
                            <Typography
                              key={index}
                              style={styles.descriptionText(isSelected)}
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
                  );
                })}
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
            {decorOptions.map((decor) => {
              const isSelected = formData.decor === decor.name;
              return (
                <Box
                  key={decor.name}
                  style={styles.card(isSelected)}
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
                  <Typography style={styles.descriptionText(isSelected)}>
                    {decor.description}
                  </Typography>
                  <Typography style={styles.priceText}>
                    Price: RS. {decor.price}
                  </Typography>
                </Box>
              );
            })}
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
                color: "#3d0420",
                marginBottom: "10px",
                fontFamily: '"Americana", regular',
                fontSize: "40px",
              }}
            >
              Select Photography Package
            </Typography>

            {photographyPackages.map((packageType) => (
              <Box key={packageType.type}>
                <Typography variant="h6" style={styles.subEventHeading}>
                  {packageType.type} Packages
                </Typography>

                {packageType.packages.map((pkg) => {
                  const isSelected = formData.photography === pkg.name;
                  return (
                    <Box
                      key={pkg.name}
                      style={styles.card(isSelected)}
                      onClick={() => handleSelect("photography", pkg.name)}
                    >
                      <Typography style={styles.cardText}>
                        {pkg.name}
                      </Typography>

                      {pkg.description && Array.isArray(pkg.description) && (
                        <Box style={{ marginTop: "10px" }}>
                          {pkg.description.map((desc, index) => (
                            <Typography
                              key={index}
                              style={styles.descriptionText(isSelected)}
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
                  );
                })}
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
                color: "#ae441d",
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
                    <span style={{ color: "#ae441d" }}>Event Type:</span>{" "}
                    {formData.eventType || (
                      <span style={{ color: "#aaa" }}>
                        No option selected. You can decide later.
                      </span>
                    )}
                  </Typography>
                </li>
                {/* Sub-Events */}
                <li style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#ae441d" }}>Sub-Events:</span>
                  </Typography>
                  {Object.keys(formData.subEvents).length > 0 ? (
                    Object.keys(formData.subEvents).map((subEvent) => (
                      <Box key={subEvent} style={{ marginTop: "10px" }}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold", color: "#333" }}
                        >
                          {subEvent}
                        </Typography>
                        <Box style={{ paddingLeft: "20px" }}>
                          {formData.subEvents[subEvent].length > 0 ? (
                            formData.subEvents[subEvent].map((menu) => (
                              <div
                                key={menu.name}
                                style={{ marginBottom: "10px" }}
                              >
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
                            ))
                          ) : (
                            <Typography
                              style={{
                                color: "#aaa",
                                marginTop: "10px",
                                fontStyle: "italic",
                              }}
                            >
                              No menus selected. You can decide later.
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography style={{ color: "#aaa", marginTop: "10px" }}>
                      No sub-events selected. You can decide later.
                    </Typography>
                  )}
                </li>

                <li style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bold",
                      color: "#333",
                      borderBottom: "2px solid #ae441d",
                      paddingBottom: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ color: "#ae441d" }}>Menu Cost:</span>{" "}
                    <span style={{ color: "#d4a373", fontWeight: "bold" }}>
                      RS. {menuPrice} Per Plate
                    </span>
                  </Typography>
                </li>

                {/* Decor */}
                <li style={{ marginBottom: "15px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#ae441d" }}>Decor:</span>{" "}
                    {formData.decor ? (
                      <>
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {formData.decor}
                        </span>{" "}
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
                      <span style={{ color: "#aaa" }}>
                        No option selected. You can decide later.
                      </span>
                    )}
                  </Typography>
                </li>
                {/* Photography */}
                <li style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    <span style={{ color: "#ae441d" }}>Photography:</span>{" "}
                    {formData.photography ? (
                      <>
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {formData.photography}
                        </span>{" "}
                        - Price:{" "}
                        <span style={{ color: "#d4a373" }}>
                          RS.{" "}
                          {(() => {
                            for (const packageType of photographyPackages) {
                              const foundPackage = packageType.packages.find(
                                (pkg) => pkg.name === formData.photography
                              );
                              if (foundPackage) {
                                return foundPackage.addPrice;
                              }
                            }
                            return 0;
                          })()}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>
                        No option selected. You can decide later.
                      </span>
                    )}
                  </Typography>
                </li>
                {() => {
                  handleSelect("photography", photographyPackages.name);
                  calculateTotalPrice(
                    formData.subEvents,
                    formData.decor,
                    photographyPackages.name
                  );
                }}
                {/* Event Cost */}
                <li style={{ marginBottom: "20px" }}>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bold",
                      color: "#333",
                      borderBottom: "2px solid #ae441d",
                      paddingBottom: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ color: "#ae441d" }}>Event Cost:</span>{" "}
                    <span style={{ color: "#d4a373", fontWeight: "bold" }}>
                      RS. {eventPrice}
                    </span>
                  </Typography>
                  <Box style={{ paddingLeft: "20px" }}></Box>
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
        <div style={styles.blurOverlay}>
          <h1 style={styles.heading}>Book Now</h1>
          <Helmet>
            <title>Wasna Palace - Book Your Event</title>
          </Helmet>

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
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
                }}
                style={{
                  ...styles.buttonBack,
                  ...(isHoveredBack ? styles.buttonHoverBack : {}),
                }}
                onMouseEnter={() => setIsHoveredBack(true)}
                onMouseLeave={() => setIsHoveredBack(false)}
              >
                Back
              </Button>
            )}
            {activeStep < 6 ? (
              <Button
                variant="contained"
                onClick={() => {
                  setActiveStep((prev) => prev + 1); // Move to the next step
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
                }}
                style={{
                  ...styles.buttonNext,
                  ...(isHoveredNext ? styles.buttonHoverNext : {}),
                }}
                onMouseEnter={() => setIsHoveredNext(true)}
                onMouseLeave={() => setIsHoveredNext(false)}
              >
                Next →
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  handleSubmit(); // Perform submission
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
                }}
                style={{
                  ...styles.buttonConfirm,
                  ...(isHoveredConfirm ? styles.buttonHoverConfirm : {}),
                }}
                onMouseEnter={() => setIsHoveredConfirm(true)}
                onMouseLeave={() => setIsHoveredConfirm(false)}
              >
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasnaPalace;
