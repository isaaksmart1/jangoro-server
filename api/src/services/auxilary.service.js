const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = require("../config/stripe");
const stripe = Stripe(STRIPE_SECRET_KEY);
const rateLimit = require("express-rate-limit");
const { redemptionTable, dynamodb, AWS } = require("../config/database");
const { createCustomer } = require("./payments.service");

// Rate limiter: prevent brute force attacks
const redeemLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Max 5 attempts per IP
  message: "Too many redemption attempts, try again later.",
});

// Redemption API
const redeem = async (params) => {
  const { code, userId, stripeCustomerId, email } = params;
  // const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    // Check if the code exists
    // const codeParams = {
    //   TableName: redemptionTable,
    //   IndexName: "code-index",
    //   KeyConditionExpression: "code = :code",
    //   ExpressionAttributeValues: { ":code": String(code) },
    // };

    // const result = await dynamodb.query(codeParams).promise();

    const codeParams = {
      TableName: redemptionTable,
      Key: {
        code: { S: code },
      },
    };

    const result = await dynamodb.getItem(codeParams).promise();

    console.log(result);

    if (!result.Item) {
      throw { message: "Invalid or expired code." };
    }

    const redeem = AWS.DynamoDB.Converter.unmarshall(result.Item);

    // Check if the code has expired
    // const expirationTime = new Date(redeem.expires_at).getTime();

    // console.log(expirationTime);
    // if (Date.now() > expirationTime) {
    //   throw { message: "This redemption code has expired." };
    // }

    if (redeem.redeemed) {
      throw { message: "Code already used." };
    }

    // Check if the user already redeemed a code
    const userCheckParams = {
      TableName: redemptionTable,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": { S: userId } },
    };

    const userCheck = await dynamodb.query(userCheckParams).promise();

    if (userCheck.Items.length > 0) {
      throw { message: "You have already redeemed a code." };
    }

    // Check if the IP has exceeded limit
    // const ipCheckParams = {
    //   TableName: redemptionTable,
    //   IndexName: "ipAddress-index",
    //   KeyConditionExpression: "ipAddress = :ipAddress",
    //   ExpressionAttributeValues: { ":ipAddress": userIP },
    // };

    // const ipCheck = await dynamodb.query(ipCheckParams).promise();
    // if (ipCheck.Items.length >= 3) {
    //   throw {
    //     statusCode: 403,
    //     message: "Too many redemptions from this IP.",
    //   };
    // }

    // Create a Lifetime Stripe subscription
    const customer = await createCustomer({
      email,
      userId,
      subscription: "lifetime",
    });

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_1QucvxL7QJgb8vM7LNKXQloP" }], // Lifetime plan Stripe price ID
      billing_cycle_anchor: Math.floor(Date.now() / 1000), // Set to current UNIX timestamp
      cancel_at_period_end: false,
      metadata: {
        plan: "Lifetime Access",
      },
    });

    // Mark code as redeemed
    const updateParams = {
      TableName: redemptionTable,
      Key: { code: { S: code } }, // Primary key to identify the item
      UpdateExpression:
        "SET redeemed = :redeemed, redeemedAt = :redeemedAt, userId = :userId, ipAddress = :ipAddress",
      ExpressionAttributeValues: {
        ":redeemed": { BOOL: true },
        ":redeemedAt": { S: new Date().toISOString() },
        ":userId": { S: userId },
        ":ipAddress": { S: "0" },
      },
    };

    await dynamodb.updateItem(updateParams).promise();

    return {
      plan: "Lifetime Access",
      message: "Code redeemed successfully! You now have lifetime access.",
    };
  } catch (error) {
    console.error("Redemption Error:", error);
    throw {
      statusCode: 500,
      ...error,
    };
  }
};

module.exports = {
  redeem,
  redeemLimiter,
};
