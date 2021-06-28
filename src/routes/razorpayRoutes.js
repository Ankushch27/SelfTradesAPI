const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Razorpay = require('razorpay');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_O7x1Z7xBaN0Kua',
  key_secret: 'MJyTbW9lBQhbNsGICqpVz4MW',
});

router.post(
  '/razorpay',
  catchAsync(async (req, res) => {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      // payment_capture: 1,
    };

    const response = await razorpay.orders.create(options);
    console.log('response', response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  })
);

module.exports = router;
