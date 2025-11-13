const socialService = require("../services/social.service");

/**
 * Redirects the client to a provider-specific OAuth URL;
 * the server composes the URL so client secrets remain server-side.
 */
async function oauthRedirectHandler(req, res) {
  const platform = req.params.platform;
  try {
    const url = socialService.buildOAuthRedirect(platform);
    if (!url) return res.status(400).json({ error: "Unsupported platform" });
    return res.redirect(url);
  } catch (err) {
    console.error("oauthRedirectHandler:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Accept authorization code from client (or provider callback).
 * Exchange code for tokens via provider and persist tokens in DB.
 * This must be authenticated (associate tokens with a user).
 */
async function oauthExchangeHandler(req, res) {
  const platform = req.params.platform;
  const { code, state, userId } = req.body; // state for CSRF, userId should be from session/auth
  try {
    const result = await socialService.exchangeCodeAndSave(platform, {
      code,
      state,
      userId,
    });
    return res.json(result);
  } catch (err) {
    console.error("oauthExchangeHandler:", err);
    return res.status(500).json({ error: err.message || "Exchange failed" });
  }
}

/**
 * Fetch recent posts for the connected account.
 * Use server token stored in DB to call provider API.
 */
async function fetchPostsHandler(req, res) {
  const platform = req.params.platform;
  const userId = req.query.userId; // or deduce from session
  try {
    const posts = await socialService.fetchPosts(platform, { userId });
    return res.json(posts);
  } catch (err) {
    console.error("fetchPostsHandler:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}

/**
 * Create a post immediately. Accepts multipart media (handled by multer).
 * Implementation delegates to socialService which uses provider APIs.
 */
async function createPostHandler(req, res) {
  const platform = req.params.platform;
  const userId = req.body.userId || req.query.userId;
  const text = req.body.text;
  const media = req.file ?? null;

  try {
    const result = await socialService.createPost(platform, {
      userId,
      text,
      media,
    });
    return res.json(result);
  } catch (err) {
    console.error("createPostHandler:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to create post" });
  }
}

/**
 * Schedule a post: persist to DB for worker to pick up.
 * Body: { platform, userId, text, scheduledAt (ISO) }
 */
async function createScheduledPostHandler(req, res) {
  const { platform, userId, text, scheduledAt } = req.body;
  try {
    const scheduled = await socialService.schedulePost({
      platform,
      userId,
      text,
      scheduledAt,
    });
    return res.status(201).json(scheduled);
  } catch (err) {
    console.error("createScheduledPostHandler:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to schedule post" });
  }
}

async function listScheduledPostsHandler(req, res) {
  const userId = req.query.userId;
  try {
    const list = await socialService.listScheduledPosts({ userId });
    return res.json(list);
  } catch (err) {
    console.error("listScheduledPostsHandler:", err);
    return res.status(500).json({ error: "Failed to list scheduled posts" });
  }
}

module.exports = {
  listScheduledPostsHandler,
  createScheduledPostHandler,
  createPostHandler,
  fetchPostsHandler,
  oauthExchangeHandler,
  oauthRedirectHandler,
};
