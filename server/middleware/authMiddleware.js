const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path if needed

module.exports = async (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging purposes
    console.log("Decoded token:", decoded);

    // Find the user based on the decoded ID
    req.user = await User.findById(decoded.id).select("-password");

    // If user doesn't exist, return an error
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
