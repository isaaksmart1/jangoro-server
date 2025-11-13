/**
 * Lightweight scheduler worker using node-cron
 * For more robust processing at scale, use a queue (BullMQ + Redis) and workers.
 *
 * This worker should be run as a separate process (e.g., pm2, systemd)
 */

const cron = require("node-cron");
const socialService = require("../api/services/social.service");

// Run every minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("socialScheduler: checking for due posts...");
    const result = await socialService.publishDuePosts();
    console.log("socialScheduler: processed", result.processed);
  } catch (err) {
    console.error("socialScheduler error:", err);
  }
});