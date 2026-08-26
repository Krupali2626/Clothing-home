const express = require('express');
const router = express.Router();
const { getStripePublishableKey } = require('../controller/public.controller');

// Public config
router.get('/stripe-key', getStripePublishableKey);

module.exports = router;