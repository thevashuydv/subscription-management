const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');

// Get all subscriptions for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });
    res.json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new subscription
router.post('/', auth, async (req, res) => {
  const { name, price, renewalDate } = req.body;

  try {
    const newSubscription = new Subscription({
      name,
      price,
      renewalDate,
      user: req.user.id
    });

    const subscription = await newSubscription.save();
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
