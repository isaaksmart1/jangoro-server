// To get your credentials:

// Instagram (via Meta): https://developers.facebook.com/apps - Create an app with Instagram Basic Display or Instagram Graph API
// Facebook: https://developers.facebook.com/apps - Same portal as Instagram
// LinkedIn: https://www.linkedin.com/developers/apps - Create an app in LinkedIn Developer Portal
// TikTok: https://developers.tiktok.com - Register for TikTok for Developers

// # Instagram OAuth
const INSTAGRAM_CLIENT_ID = "your_instagram_client_id_here";
const INSTAGRAM_CLIENT_SECRET = "your_instagram_client_secret_here";
const INSTAGRAM_REDIRECT_URI = "http://localhost:4173/auth/instagram/callback";

// # Facebook OAuth
const FACEBOOK_CLIENT_ID = "your_facebook_app_id_here";
const FACEBOOK_CLIENT_SECRET = "your_facebook_app_secret_here";
const FACEBOOK_REDIRECT_URI = "http://localhost:4173/auth/facebook/callback";

// # LinkedIn OAuth
const LINKEDIN_CLIENT_ID = "784emjw21fm3ry";
const LINKEDIN_CLIENT_SECRET = "WPL_AP1.nAfo1B0QRW7sZaB0.HLE1Mg==";
const LINKEDIN_REDIRECT_URI = "http://localhost:4173/social/linkedin";

// # TikTok OAuth
const TIKTOK_CLIENT_ID = "your_tiktok_client_key_here";
const TIKTOK_CLIENT_SECRET = "your_tiktok_client_secret_here";
const TIKTOK_REDIRECT_URI = "http://localhost:4173/auth/tiktok/callback";

module.exports = {
  INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET,
  INSTAGRAM_REDIRECT_URI,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URI,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT_URI,
  TIKTOK_CLIENT_ID,
  TIKTOK_CLIENT_SECRET,
  TIKTOK_REDIRECT_URI,
};
