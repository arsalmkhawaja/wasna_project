require("dotenv").config();
require("express-async-errors");
const path = require("path");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();

// Importing routes
const user = require("./routes/User");
const reciept = require("./routes/Reciept");

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// API Routes
app.use("/api/v1", user);
app.use("/api/v2", reciept);

// Server startup
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

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

start();
