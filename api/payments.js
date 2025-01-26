const express = require("express");
const stripe = require("stripe")("sk_test_your_secret_key"); // Use your Stripe secret key
const app = express();

app.use(express.json());

// Endpoint to create a PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body; // Amount and currency sent from the frontend

  try {
    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 5000 = $50.00)
      currency,
      payment_method_types: ["card"], // Can add more types if necessary
    });

    // Send client secret to the frontend
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({
      error: "An error occurred while creating the PaymentIntent.",
    });
  }
});

app.post("/api/get-setup-intent", async (req, res) => {
  const { customerId } = req.body;

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
    });
    res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error("Error creating Setup Intent:", error);
    res.status(500).json({ error: "Failed to create Setup Intent" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});