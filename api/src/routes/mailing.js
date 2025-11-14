const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Function to save email to CSV
const saveEmailToCSV = (email) => {
  const csvLine = `${email}\n`;
  const csvPath = path.join(__dirname, "../csv/mailing.csv");

  try {
    // Create data directory if it doesn't exist
    const dataDir = path.dirname(csvPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create CSV file with headers if it doesn't exist
    if (!fs.existsSync(csvPath)) {
      const headers = "email\n";
      fs.writeFileSync(csvPath, headers);
    }

    // Append the new entry
    fs.appendFileSync(csvPath, csvLine);
  } catch (err) {
    console.error("Error saving email to CSV:", err);
  }
};

// POST endpoint to capture email and return guide download info
router.post("/mailing-list", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email and guide ID are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Save email to CSV
    saveEmailToCSV(email);

    // Return guide download information
    res.json({
      success: true,
      message: "Email captured successfully!",
    });
  } catch (error) {
    console.error("Error capturing email:", error);
    res.status(500).json({
      error: "Failed to capture email. Please try again.",
    });
  }
});

module.exports = router