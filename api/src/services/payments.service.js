const Stripe = require("stripe");
const {
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_KEY,
  STRIPE_PRICE_ID,
} = require("../config/stripe");
const membershipIDs = require("../config/stripe-membership-ids.json");
const account = require("../services/accounts.service");
const { URL } = require("../middleware/helpers");
const stripe = Stripe(STRIPE_SECRET_KEY);

// In-memory storage for processed event IDs (use persistent storage in production)
const processedEventIds = new Set();

// Find or create a new customer
const findOrCreateCustomer = async (email, metadata) => {
  let customer = null;
  try {
    // Use an existing Customer ID if this is a returning customer.
    customer = await stripe.customers
      .list({
        email: email,
      })
      .then((customers) =>
        customers.data.length > 0 ? customers.data[0] : null
      );
    customer = await stripe.customers.update(customer.id, {
      metadata,
    });
    console.log(`Customer updated ${customer.id}`);
  } catch (error) {
    console.log("Customer not found, creating new customer...");
    customer = await stripe.customers.create({
      email,
      metadata,
    });
    console.log(`New customer created ${customer.id}`);
  }
  return customer;
};

const createStripeAccount = async (params) => {
  const { country, email } = params;
  try {
    account = await stripe.Account.create(
      (type = "express"),
      (country = country),
      (email = email),
      (capabilities = {
        transfers: { requested: True },
      })
    );
    return account;
  } catch (error) {
    console.log(error);
  }
};

const createSubscription = async (payload) => {
  const { email, username, subscriptionPrice, paymentMethodId } = payload;
  try {
    // Metadata
    const metadata = {
      username,
      subscription_price: subscriptionPrice,
    };

    let customer = await findOrCreateCustomer(email, metadata);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(subscriptionPrice),
      currency: "gbp",
      customer: customer.id,
      setup_future_usage: "off_session", // or 'on_session' if the customer is present in checkout flow
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: STRIPE_PUBLISHABLE_KEY,
    };
  } catch (error) {
    return { error: { message: error.message } };
  }
};

const webhook = async (req) => {
  let event = stripe.webhooks.constructEvent(
    req.body,
    req.headers["stripe-signature"],
    STRIPE_WEBHOOK_KEY
  );

  const paymentIntent = event.data.object;
  const customerId = paymentIntent.customer;

  // Check if the event has already been processed
  if (processedEventIds.has(customerId)) {
    return { received: true };
  }

  try {
    switch (event.type) {
      case "invoice.payment_failed":
        await retryPayment(event, stripe);
        break;
      case "payment_intent.payment_failed":
        await retryPayment(event, stripe);
        break;
      case "payment_intent.succeeded":
        await subscribe(event);
        break;
      default:
        // Unexpected event type
        throw "Unknown event type";
    }

    // Mark the event as processed
    processedEventIds.add(customerId);

    return { received: true };
  } catch (err) {
    throw `Server Error: ${err.message}`;
  }
};

const retrieveSession = async (params) => {
  try {
    const { sessionId } = params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) throw new Error("Session not found");

    return {
      customerId: session.customer,
      subscriptionId: session.subscription,
    };
  } catch (error) {
    console.error("Error retrieving session:", error);
    return { error: "Failed to retrieve session" };
  }
};

const createPaymentIntent = async (params) => {
  const { subscription } = params;
  try {
    const interval = subscription.plan.includes("monthly") ? "month" : "year";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        trial_period_days: 1, // 1-day free trial
      },
      success_url: `${URL.app}/login?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${URL.app}/login`,
      metadata: {
        userId: params.id, // Store user ID for reference
        subscriptionType: interval, // Monthly or Annually
        email: params.email,
      },
    });

    // Return necessary params to frontend
    return {
      id: session.id,
      url: session.url, // Stripe checkout redirect URL
      customerId: session.customer, // Stripe customer ID
      subscriptionId: session.subscription, // Subscription ID
      amount: params.amount, // Amount charged
      interval, // Subscription plan interval
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSetupIntent = async (params) => {
  const { customerId } = params;

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
    });
    return { clientSecret: setupIntent.client_secret };
  } catch (error) {
    console.error("Error creating Setup Intent:", error);
    res.status(500).json({ error: "Failed to create Setup Intent" });
  }
};

const createBillingPortal = async (params) => {
  try {
    const { customerId } = params;
    if (!customerId) {
      return { error: "Missing customer ID" };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "http://app.jangoro.com/billing", // Redirect user back
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe Billing Portal Error:", error);
    return { error: "Failed to create billing portal session" };
  }
};

const createCustomer = async (params) => {
  const { email, username, subscription } = params;
  try {
    // Metadata
    const metadata = {
      username,
      subscription_price: subscription,
    };

    let customer = await findOrCreateCustomer(email, metadata);
    return customer;
  } catch (err) {
    console.log(err);
  }
};

const transactions = async (params) => {
  const { customerId } = params;

  try {
    // Retrieve charges for the customer
    const charges = await stripe.charges.list({
      customer: customerId,
      limit: 10, // Adjust the limit as needed
    });

    // Return charge data
    return {
      success: true,
      transactions: charges.data,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

const makePayment = async (
  account,
  bankName,
  accountNumber,
  routingNumber,
  swiftCode,
  amount
) => {
  try {
    let customer = await findOrCreateCustomer(account.email, {
      customerId: account.customerId,
    });
    // Create a bank account token with international details
    const bankAccountToken = await stripe.tokens.create({
      bank_account: {
        country: "GB", // Set to GB for the United Kingdom
        currency: "gbp", // Set to GBP for British Pound
        account_holder_name: bankName,
        account_holder_type: "individual", // or 'company'
        routing_number: routingNumber, // Sort code in the UK
        account_number: accountNumber,
        swift_code: swiftCode, // SWIFT/BIC code for international transfers
      },
    });

    // Attach the bank account to the customer
    const bankAccount = await stripe.customers.createSource(
      customer.metadata.customerId,
      {
        source: bankAccountToken.id,
      }
    );

    // Create a charge
    const charge = await stripe.charges.create({
      amount: amount, // Amount in pence (e.g., £10.00)
      currency: "gbp",
      customer: customer.metadata.customerId,
      source: bankAccount.id,
      description: `Payment using bank account ${accountNumber}`,
    });

    console.log("Charge successful:", charge);
    return charge;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
};

async function retryPayment(event, stripe) {
  const invoice = event.data.object;
  const subscriptionId = invoice.subscription;
  const username = invoice.customer.metadata.username;
  // Retry logic here (e.g., retry after 3 days)
  setTimeout(async () => {
    try {
      await stripe.invoices.pay(invoice.id);
    } catch (error) {
      // If retry fails, notify the user to pay manually
      console.log(subscriptionId);
      console.log(username);
    }
  }, 3 * 24 * 60 * 60 * 1000); // Retry in 3 days
}

async function cancelSubscriptionsAndDeleteCustomer(email) {
  try {
    // Find the customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      throw `No customer found with email ${email}`;
    }

    const customer = customers.data[0];

    // Delete the customer
    const result = await stripe.customers.del(customer.id);

    if (result.deleted) {
      // Retrieve the customer's subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
      });

      // Cancel each subscription
      for (const subscription of subscriptions.data) {
        await stripe.subscriptions.del(subscription.id);
      }

      console.log(
        `Customer ${customer.id} and their subscriptions have been deleted.`
      );
      return 200;
    }
  } catch (error) {
    console.log(`Failed to delete customer:`, error);
    return error;
  }
}

async function subscribe(event) {
  const paymentIntent = event.data.object;
  const customerId = paymentIntent.customer;
  const paymentMethodId = paymentIntent.payment_method; // Assumes payment method ID is available
  const subscriptionPrice = paymentIntent.customer.metadata.subscription_price;

  const customer = await stripe.customers.retrieve(customerId);
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

  // console.log("Payment Method ID:", paymentMethodId);

  try {
    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // console.log("Customer Details:", customer);

    // Set the default payment method for the customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // console.log("Payment Method Details:", paymentMethod);

    // Fetch the list of subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all", // You can filter based on the subscription status if needed
    });

    // Check if any subscription matches the specified priceId
    const existingSubscription = subscriptions.data.find((subscription) =>
      subscription.items.data.some(
        (item) => item.price.id === membershipIDs[subscriptionPrice]
      )
    );

    if (existingSubscription) {
      console.log("Subscription already exists, doing nothing.");
    } else {
      // Create a subscription for the customer
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: membershipIDs[subscriptionPrice] }],
        default_payment_method: paymentMethodId,
      });
      // Update user in the database
      const user = await account.getUser(customerId.metadata.email);
      await account.updateUser({ ...user, customerId });
      console.log(`Customer ${customerId} subscribed to the monthly plan.`);
    }
  } catch (error) {
    console.error(
      `Failed to subscribe customer ${customerId}: ${error.message}`
    );
  }
}

module.exports = {
  createStripeAccount,
  createSubscription,
  cancelSubscriptionsAndDeleteCustomer,
  createBillingPortal,
  createPaymentIntent,
  retrieveSession,
  createCustomer,
  getSetupIntent,
  transactions,
  makePayment,
  webhook,
};
