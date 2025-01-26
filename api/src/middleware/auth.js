var rateLimit = require("express-rate-limit");
var jwt = require("jsonwebtoken");
var config = require("../config.json");
var {
  generateJwtToken,
  generateRefreshToken,
} = require("../services/accounts.service");

// Rate limiter for forgot password endpoint
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message:
    "Too many password reset attempts from this device, please try again after 15 minutes.",
});

// Middleware to authenticate and refresh tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      // Check if the error is due to expiration
      if (err.name === "TokenExpiredError") {
        // If expired, get the refresh token from the headers
        const refreshToken = req.headers["x-refresh-token"];
        if (!refreshToken) return res.sendStatus(403); // Forbidden

        // Verify the refresh token
        jwt.verify(refreshToken, config.refreshSecret, (err, user) => {
          if (err) return res.sendStatus(403); // Forbidden

          // Generate new tokens
          const newAccessToken = generateJwtToken(user);
          const newRefreshToken = generateRefreshToken(user);

          // Send the new tokens in the response headers
          res.setHeader("Authorization", `Bearer ${newAccessToken}`);
          res.setHeader("x-refresh-token", newRefreshToken);

          // Attach the user to the request and continue
          req.user = user;
          next();
        });
      } else {
        return res.sendStatus(403); // Forbidden for other errors
      }
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = {
  forgotPasswordLimiter,
  authenticateToken,
};
