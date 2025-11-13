const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

const {
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
} = require("../config/socials");

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const { schedulePostsTable, socialTokensTable } = require("../config/database");

// Table names - configure these via environment variables
const SOCIAL_TOKENS_TABLE = socialTokensTable;
const SCHEDULED_POSTS_TABLE = schedulePostsTable;

/**
 * NOTE: platform-specific implementations below are minimal stubs.
 * You must replace with each platform's Graph / REST API integration
 * using credentials from environment variables and the appropriate endpoints.
 *
 * This service:
 * - builds provider redirect URLs
 * - exchanges codes for tokens and stores tokens in DynamoDB (server-side)
 * - fetches posts using tokens
 * - creates immediate posts
 * - schedules posts in the scheduled_posts table
 *
 * DynamoDB Table Schemas:
 *
 * social_tokens:
 *   PK: userId (String) - Partition Key
 *   SK: platform (String) - Sort Key
 *   Attributes: id, access_token, refresh_token, expires_at, raw, created_at
 *   GSI (optional): platform-index with platform as PK
 *
 * scheduled_posts:
 *   PK: id (String) - Partition Key
 *   SK: scheduled_at (String) - Sort Key
 *   Attributes: user_id, platform, text, status, created_at, posted_at, provider_response, last_error
 *   GSI: user_id-index with user_id as PK, scheduled_at as SK
 *   GSI: status-scheduled_at-index with status as PK, scheduled_at as SK (for worker queries)
 */

const PLATFORM_CONFIG = {
  instagram: {
    clientId: INSTAGRAM_CLIENT_ID,
    redirectUri: INSTAGRAM_REDIRECT_URI,
    authUrl: "https://api.instagram.com/oauth/authorize",
    tokenUrl: "https://api.instagram.com/oauth/access_token",
  },
  facebook: {
    clientId: FACEBOOK_CLIENT_ID,
    redirectUri: FACEBOOK_REDIRECT_URI,
    authUrl: "https://www.facebook.com/v16.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v16.0/oauth/access_token",
  },
  linkedin: {
    clientId: LINKEDIN_CLIENT_ID,
    redirectUri: LINKEDIN_REDIRECT_URI,
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    scope: "profile email w_member_social",
  },
  tiktok: {
    clientId: TIKTOK_CLIENT_ID,
    redirectUri: TIKTOK_REDIRECT_URI,
    authUrl: "https://open.tiktok.com/platform/oauth/authorize",
    tokenUrl: "https://open.tiktok.com/platform/oauth/access_token",
  },
};

const socialService = {
  buildOAuthRedirect(platform) {
    const cfg = PLATFORM_CONFIG[platform];
    if (!cfg) return null;
    // Build query params - include state for CSRF and 'scope' as needed per provider
    const state = uuidv4();
    // You should save state -> user mapping (session) server-side for verification
    const params = new URLSearchParams({
      response_type: "code",
      client_id: cfg.clientId,
      redirect_uri: cfg.redirectUri,
      state,
      scope: cfg.scope || "profile email",
    });
    return `${cfg.authUrl}?${params.toString()}`;
  },

  async exchangeCodeAndSave(platform, { code, userId }) {
    const cfg = PLATFORM_CONFIG[platform];
    if (!cfg) throw new Error("Unsupported platform");

    // Example: exchange code for token. Real implementation depends on provider.
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: cfg.clientId,
      client_secret: `${platform.toUpperCase()}_CLIENT_SECRET`,
      redirect_uri: cfg.redirectUri,
      code,
    });

    const res = await fetch(cfg.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error("Token exchange failed: " + text);
    }

    const tokenData = await res.json();

    // Persist tokenData in DynamoDB tokens table
    const now = new Date().toISOString();
    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
      : null;

    const item = {
      userId: userId || "guest",
      platform,
      id: uuidv4(),
      access_token: tokenData.access_token || tokenData.accessToken,
      refresh_token: tokenData.refresh_token || null,
      expires_at: expiresAt,
      raw: tokenData,
      created_at: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: SOCIAL_TOKENS_TABLE,
        Item: item,
      })
    );

    return { success: true, tokenData };
  },

  async fetchPosts(platform, { userId }) {
    // Lookup access token for user from DynamoDB
    const result = await docClient.send(
      new GetCommand({
        TableName: SOCIAL_TOKENS_TABLE,
        Key: {
          userId: userId || "guest",
          platform,
        },
      })
    );

    const tokenRow = result.Item;
    if (!tokenRow) throw new Error("Account not connected");

    // Example provider call - replace with provider-specific endpoint
    // For LinkedIn, you'd call the shares API; for Facebook/Instagram use Graph API endpoints.
    // Returning a normalized array of posts: { id, text, media, createdAt }
    // STUB:
    return [
      {
        id: "stub-1",
        text: `Example post from ${platform}`,
        media: null,
        createdAt: new Date().toISOString(),
      },
    ];
  },

  async createPost(platform, { userId, text, media }) {
    const result = await docClient.send(
      new GetCommand({
        TableName: SOCIAL_TOKENS_TABLE,
        Key: {
          userId: userId || "guest",
          platform,
        },
      })
    );

    const tokenRow = result.Item;
    if (!tokenRow) throw new Error("Account not connected");

    // For media, you likely need to upload to provider first, then publish referencing media id.
    // This stub fakes a post creation and returns a result object.
    // Replace with provider-specific logic.
    const postResult = {
      success: true,
      platform,
      postedAt: new Date().toISOString(),
      providerResponse: { stub: true },
    };

    return postResult;
  },

  async schedulePost({ platform, userId, text, scheduledAt }) {
    const id = uuidv4();
    const now = new Date().toISOString();

    const item = {
      id,
      scheduled_at: scheduledAt,
      user_id: userId || "guest",
      platform,
      text,
      status: "scheduled",
      created_at: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: SCHEDULED_POSTS_TABLE,
        Item: item,
      })
    );

    return { id, platform, text, scheduledAt };
  },

  async listScheduledPosts({ userId }) {
    if (userId) {
      // Query using GSI on user_id
      const result = await docClient.send(
        new QueryCommand({
          TableName: SCHEDULED_POSTS_TABLE,
          IndexName: "user_id-index",
          KeyConditionExpression: "user_id = :userId",
          ExpressionAttributeValues: {
            ":userId": userId,
          },
        })
      );
      return result.Items || [];
    } else {
      // Scan all scheduled posts (use with caution on large tables)
      const result = await docClient.send(
        new ScanCommand({
          TableName: SCHEDULED_POSTS_TABLE,
        })
      );
      return result.Items || [];
    }
  },

  /* Called by worker: get due posts, post them to provider, mark posted */
  async publishDuePosts() {
    const now = new Date().toISOString();

    // Query using GSI on status and scheduled_at
    const result = await docClient.send(
      new QueryCommand({
        TableName: SCHEDULED_POSTS_TABLE,
        IndexName: "status-scheduled_at-index",
        KeyConditionExpression: "#status = :status AND scheduled_at <= :now",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": "scheduled",
          ":now": now,
        },
      })
    );

    const posts = result.Items || [];

    for (const post of posts) {
      try {
        const publishResult = await this.createPost(post.platform, {
          userId: post.user_id,
          text: post.text,
          media: null,
        });

        await docClient.send(
          new UpdateCommand({
            TableName: SCHEDULED_POSTS_TABLE,
            Key: {
              id: post.id,
              scheduled_at: post.scheduled_at,
            },
            UpdateExpression:
              "SET #status = :status, posted_at = :postedAt, provider_response = :response",
            ExpressionAttributeNames: {
              "#status": "status",
            },
            ExpressionAttributeValues: {
              ":status": "posted",
              ":postedAt": new Date().toISOString(),
              ":response": publishResult,
            },
          })
        );
      } catch (err) {
        console.error("Failed to publish scheduled post", post.id, err);

        await docClient.send(
          new UpdateCommand({
            TableName: SCHEDULED_POSTS_TABLE,
            Key: {
              id: post.id,
              scheduled_at: post.scheduled_at,
            },
            UpdateExpression: "SET #status = :status, last_error = :error",
            ExpressionAttributeNames: {
              "#status": "status",
            },
            ExpressionAttributeValues: {
              ":status": "failed",
              ":error": String(err),
            },
          })
        );
      }
    }

    return { processed: posts.length };
  },
};

module.exports = socialService;
