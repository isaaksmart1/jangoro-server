const express = require("express");
const fs = require("fs");
const path = require("path");
const sendEmail = require("../middleware/send-email");
const router = express.Router();

// Function to save email to CSV
const saveEmailToCSV = (email, guideId, timestamp) => {
  const csvLine = `${email},${guideId},${timestamp}\n`;
  const csvPath = path.join(__dirname, "../data/guide-downloads.csv");

  try {
    // Create data directory if it doesn't exist
    const dataDir = path.dirname(csvPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create CSV file with headers if it doesn't exist
    if (!fs.existsSync(csvPath)) {
      const headers = "email,guide_id,download_timestamp\n";
      fs.writeFileSync(csvPath, headers);
    }

    // Append the new entry
    fs.appendFileSync(csvPath, csvLine);
  } catch (err) {
    console.error("Error saving email to CSV:", err);
  }
};

// Function to get guide details
const getGuideDetails = (guideId) => {
  const guides = {
    "survey-mistakes-guide": {
      title: "5 Common Survey Mistakes SMEs Make",
      description:
        "Learn the common pitfalls small businesses make when conducting and analysing surveys. Perfect for researchers, marketers, and business analysts.",
      downloadUrl: "/guides/survey-mistakes-guide.pdf",
    },
    "feedback-fortune-guide": {
      title: "The SME Customer Feedback Playbook",
      description:
        "This short guide (6–8 pages) would give SMEs a step-by-step system for turning customer feedback into business growth. It highlights actionable tactics while naturally leading into Jangoro as the tool that makes this process effortless.",
      downloadUrl: "/guides/feedback-fortune-guide.pdf",
    },
  };

  return guides[guideId] || null;
};

// POST endpoint to capture email and return guide download info
router.post("/capture-email", async (req, res) => {
  try {
    const { email, guideId } = req.body;

    if (!email || !guideId) {
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

    // Get guide details
    const guide = getGuideDetails(guideId);
    if (!guide) {
      return res.status(404).json({
        error: "Guide not found",
      });
    }

    // Save email to CSV
    const timestamp = new Date().toISOString();
    saveEmailToCSV(email, guideId, timestamp);

    // Return guide download information
    res.json({
      success: true,
      message: "Email captured successfully!",
      downloadUrl: guide.downloadUrl,
      guideTitle: guide.title,
      guide: guide,
    });
  } catch (error) {
    console.error("Error capturing email:", error);
    res.status(500).json({
      error: "Failed to capture email. Please try again.",
    });
  }
});

// GET endpoint to retrieve guide details
router.get("/guide/:guideId", (req, res) => {
  try {
    const { guideId } = req.params;
    const guide = getGuideDetails(guideId);

    if (!guide) {
      return res.status(404).json({ error: "Guide not found" });
    }

    res.json({ guide });
  } catch (error) {
    console.error("Error retrieving guide:", error);
    res.status(500).json({ error: "Failed to retrieve guide" });
  }
});

// GET endpoint to list all guides
router.get("/guides", (req, res) => {
  try {
    const guides = [
      {
        id: "survey-mistakes-guide",
        title: "5 Common Survey Mistakes SMEs Make",
        description:
          "Learn the common pitfalls small businesses make when conducting and analysing surveys. Perfect for researchers, marketers, and business analysts.",
        downloadUrl: "/guides/survey-mistakes-guide.pdf",
      },
      {
        id: "feedback-fortune-guide",
        title: "The SME Customer Feedback Playbook",
        description:
          "This short guide (6-8 pages) would give SMEs a step-by-step system for turning customer feedback into business growth. It highlights actionable tactics while naturally leading into Jangoro as the tool that makes this process effortless.",
        downloadUrl: "/guides/feedback-fortune-guide.pdf",
      },
    ];

    res.json({ guides });
  } catch (error) {
    console.error("Error listing guides:", error);
    res.status(500).json({ error: "Failed to list guides" });
  }
});

module.exports = router;
