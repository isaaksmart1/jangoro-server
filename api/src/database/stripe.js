const Stripe = require("stripe");
const {
  STRIPE_SECRET_KEY,
} = require("../config/stripe");
const stripe = Stripe(STRIPE_SECRET_KEY);

const clearAll = async (email, limit) => {
  try {
    // Find the customer by email
    const customers = await stripe.customers.list({
      email,
      limit,
    });

    for (let i = 0; i < customers.data.length; i++) {
      // Retrieve the customer's subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[i].id,
      });

      // Cancel each subscription
      for (const subscription of subscriptions.data) {
        await stripe.subscriptions.del(subscription.id);
      }
    }

    let hasMore = true;
    while (hasMore) {
      for (const customer of customers.data) {
        await stripe.customers.del(customer.id);
        console.log(`Deleted customer ${customer.id}`);
      }

      hasMore = customers.has_more;
    }
  } catch (error) {
    console.log(error);
  }
};

const limit = 1000;
clearAll('ras.smart@ntlworld.com', limit);
