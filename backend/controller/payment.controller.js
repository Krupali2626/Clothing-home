const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Create PaymentIntent for card payments
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // amount expected in smallest currency unit (paise for INR)
    const amountInSmallest = Math.round(Number(amount));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallest,
      currency,
      // You can attach metadata here to reference the user/order
      metadata: {
        userId: req.user ? String(req.user._id) : 'guest',
      },
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('createPaymentIntent error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};