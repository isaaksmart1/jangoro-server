const express = require("express");
const multer = require("multer");
const {
  oauthRedirectHandler,
  oauthExchangeHandler,
  fetchPostsHandler,
  createPostHandler,
  createScheduledPostHandler,
  listScheduledPostsHandler,
} = require("../controllers/socialController");
const fs = require("fs");

const router = express.Router();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB

router.get("/:platform/status", (req, res) => {
  const { platform } = req.params;
  let userConnections = fs.readFileSync("./database/socialConnections.json");
  userConnections = JSON.parse(userConnections);
  const idx = userConnections.indexOf(platform);
  if (idx > -1) {
    res.json({ connected: true });
  } else {
    res.json({ connected: false });
  }
});

router.get("/:platform/oauth/redirect", oauthRedirectHandler);

// Exchange code for tokens (server-side)
router.post("/:platform/oauth/exchange", oauthExchangeHandler);

// Fetch posts from connected account
router.get("/:platform/posts", fetchPostsHandler);

// Create a post now (multipart if media)
router.post("/:platform/posts", upload.single("media"), createPostHandler);

// Schedule a post (JSON)
router.post("/scheduled", createScheduledPostHandler);

// List scheduled posts
router.get("/scheduled", listScheduledPostsHandler);

module.exports = router;
