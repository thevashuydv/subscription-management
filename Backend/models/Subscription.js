const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  platform: {
    type: String,
    required: true,
    enum: ['Netflix', 'Amazon Prime Video', 'Disney+', 'Hulu']
  },
  planType: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium']
  },
  price: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  renewalDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Cancelled'],
    default: 'Active'
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'UPI', 'Cash']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription; 