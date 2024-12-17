require("dotenv").config();
require("express-async-errors");
const path = require("path");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();

// Importing routes
const mainRouter = require("./routes/user");

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// API Routes
app.use("/api/v1", mainRouter);

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
