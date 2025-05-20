// routes/admin-auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.admin = admin;
    next();
  });
};

// Register Admin
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const admin = await Admin.create({ username, email, password});
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id, role: "Admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, admin: { username: admin.username, email: admin.email } });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Admin Profile (Authenticated)
router.get("/profile", authenticateAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.log("Error fetching admin profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  // Add logic to remove admin details if needed
  res.status(200).json({ message: "Logout successful" });
});


module.exports = router;
