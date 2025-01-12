// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin-auth");

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend requests
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error connecting to the database:", error));

// Start the server
const port = process.env.PORT || 5023;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
