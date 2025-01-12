const express = require("express");
const Resource = require("../models/Resource");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a new resource
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const resource = await Resource.create({ title, content, owner: req.user._id });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all resources for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resources = await Resource.find({ owner: req.user._id });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a resource
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a resource (Admin-only)
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.status(200).json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
