const express = require('express');
const router = express.Router();
const { payment } = require('../controller');
const { protect } = require('../middleware/auth.middleware');

// Protected: create PaymentIntent
router.post('/create-payment-intent', protect, payment.createPaymentIntent);

module.exports = router;