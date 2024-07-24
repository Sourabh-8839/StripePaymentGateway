const express = require('express');
const { paymentOrder } = require('../controller/user.controller');

const router = express.Router();

router.route('/api/create-checkout-session').post(paymentOrder);

module.exports = router;
