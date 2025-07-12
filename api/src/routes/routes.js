var express = require("express");
const jwt = require("jsonwebtoken");
var config = require("../config.json");
var {
  forgotPasswordLimiter,
  authenticateToken,
} = require("../middleware/auth");
var account = require("../services/accounts.service");
var {
  webhook,
  createSubscription,
  createCustomer,
  transactions,
  retrieveSession,
  getSetupIntent,
  createBillingPortal,
  createPaymentIntent,
  retrieveCustomer,
} = require("../services/payments.service");
const {
  redeem,
  getRandomRedemptionCode,
  countActiveRedemptions,
} = require("../services/auxilary.service");
var routes = express();

routes.get("/", defaultRoute);
routes.get("/index", healthCheck);
routes.post("/login", login);
routes.post("/register", register);

// Accounts API
routes.post("/user/reset-password/:token", resetPassword);
routes.post("/user/forgot-password", forgotPassword);
routes.get("/user/:email", getUser);
routes.get("/user/id/:id", getUserById);
routes.post("/user/update", updateUser);
routes.post("/user/update/password", updatePassword);
routes.post("/user/deactivate", deactivate);
routes.post("/user/refresh-token", refreshToken);

// Payments API
routes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentsWebhook
);
routes.post("/create-subscription", paymentsSubscription);
routes.post("/create-stripe-account", createStripeAccount);
routes.post("/create-payment-intent", pay);
routes.post("/get-setup-intent", updateCardDetails);
routes.post("/retrieve-session", getStripeSession);
routes.post("/create-billing-portal-session", billingPortal);
routes.get("/retrieve-customer", getStripeCustomer);
routes.get("/get-transactions", getTransactions);

// Auxilary API
routes.get("/user/redeem/get", getRedeemCode);
routes.get("/redeem/total", countRedemptions);
routes.post("/user/redeem", redeemCode);

function defaultRoute(req, res) {
  const dt = new Date();
  res.send({
    data: dt.toISOString(),
  });
}

function healthCheck(req, res) {
  const systemDown = false;
  if (systemDown) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
}

function login(req, res) {
  const { email, password } = req.body;
  account
    .authenticate(email, password)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function register(req, res) {
  const data = req.body;
  account
    .register(data)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function resetPassword(req, res) {
  const { token } = req.params;
  const { password, email } = req.body;
  account
    .resetPassword(token, email, password)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function forgotPassword(req, res) {
  const { email } = req.body;
  account
    .forgotPassword(email)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function getUser(req, res) {
  const { email } = req.params;
  account
    .getUser(email)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function getUserById(req, res) {
  const { id } = req.params;
  account
    .getUserById(id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function updateUser(req, res) {
  const data = req.body;
  account
    .updateUser(data)
    .then((status) => {
      res.status(200).send(status);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function refreshToken(req, res) {
  const refreshToken = req.headers["x-refresh-token"];
  if (!refreshToken) return res.sendStatus(401); // Unauthorized

  jwt.verify(refreshToken, config.refreshSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    const newAccessToken = account.generateJwtToken(user);
    const newRefreshToken = account.generateRefreshToken(user);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
}

function updatePassword(req, res) {
  const data = req.body;
  account
    .updatePassword(data)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function deactivate(req, res) {
  account
    .deactivate(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function paymentsWebhook(req, res) {
  webhook(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function paymentsSubscription(req, res) {
  createSubscription(req.body)
    .then((subscription) => {
      res.send(subscription);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getStripeSession(req, res) {
  retrieveSession(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getStripeCustomer(req, res) {
  const { email } = req.query;
  retrieveCustomer(email)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function createStripeAccount(req, res) {
  createCustomer(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function pay(req, res) {
  createPaymentIntent(req.body)
    .then((secret) => {
      res.send(secret);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function updateCardDetails(req, res) {
  getSetupIntent(req.body)
    .then((secret) => {
      res.send(secret);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function billingPortal(req, res) {
  createBillingPortal(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}

function getTransactions(req, res) {
  transactions(req.query)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

function redeemCode(req, res) {
  redeem(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      const status = err.statusCode || 400;
      res.status(status).send(err);
    });
}

function countRedemptions(req, res) {
  countActiveRedemptions()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      const status = err.statusCode || 400;
      res.status(status).send(err);
    });
}

function getRedeemCode(req, res) {
  getRandomRedemptionCode()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      const status = err.statusCode || 400;
      res.status(status).send(err);
    });
}

module.exports = routes;
