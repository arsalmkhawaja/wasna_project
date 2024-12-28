const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    // Connect to MongoDB using the URI
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure if DB connection fails
  }
};

module.exports = connectDB;
