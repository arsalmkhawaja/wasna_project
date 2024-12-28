require("dotenv").config();  // Load environment variables from .env
require("express-async-errors");  // Handle async errors
const path = require("path");
const connectDB = require("./config/db");  // Import DB connection logic
const express = require("express");
const cors = require("cors");
const app = express();

// Importing routes
const user = require("./routes/User");
const reciept = require("./routes/Reciept");

// Middleware
app.use(express.json());  // For parsing application/json
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // Static files for uploads
app.use(cors());  // Enable CORS for all requests

// API Routes
app.use("/api/v1", user);   // User-related routes
app.use("/api/v2", reciept); // Receipt-related routes

// Server startup
const port = process.env.PORT || 4000;  // Use PORT from .env or fallback to 4000

const start = async () => {
  try {
    // Establish DB connection using the MONGO_URI environment variable
    await connectDB(process.env.MONGO_URI);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/api/v3", (req, res) => {
  res.send("Server is running");
});

// Start the application
start();
