const express = require("express");
const Resource = require("../models/Resource"); // Adjust path if needed

const router = express.Router();

// Example of a route that requires authorization
router.post("/create", async (req, res) => {
  try {
    // Log the incoming data for debugging purposes
    console.log("Received new resource data:", req.body);

    // Make sure the user is authenticated before proceeding
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newResource = new Resource({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user._id, // Using the user _id from the decoded token
    });

    // Save the resource to the database
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Error creating resource" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.user._id }); // Get resources for the authenticated user
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Error fetching resources" });
  }
});

module.exports = router;
