// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin-auth");
const resourceRoutes = require("./routes/resource"); // Import resource routes

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend requests (specify allowed origin)
const allowedOrigins = ["http://localhost:3000"];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"]
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/resource", resourceRoutes); // Add resource routes here

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Stop the server if the DB connection fails
  });

// Start the server
const port = process.env.PORT || 5023;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
