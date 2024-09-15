const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  platform: {
    type: String,
    required: true
},


  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  renewalDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
//module.exports = mongoose.model('Subscription', SubscriptionSchema);
