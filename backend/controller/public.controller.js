// Public controller for non-sensitive public config
exports.getStripePublishableKey = async (req, res) => {
  try {
    const key = process.env.STRIPE_PUBLISHABLE_KEY || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || null;
    if (!key) {
      return res.status(500).json({ success: false, message: 'Stripe publishable key not configured on server' });
    }
    res.json({ success: true, publishableKey: key });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};