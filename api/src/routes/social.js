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

const router = express.Router();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } }); // 20MB
const userConnections = new Set();

router.get("/:platform/status", (req, res) => {
  const { platform } = req.params;
  const connected = userConnections.has(platform);
  res.json({ connected });
});

// Build provider OAuth redirect and send user
router.get("/:platform/oauth/redirect", async () => {
  const { platform } = req.params;
  await oauthRedirectHandler;
  userConnections.add(platform);
});

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
