const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  purchaseItem: [
    {
      type: String,
    },
  ],

  transactionId: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['success', 'failed'],
  },
});

const Orders = mongoose.model('orders', OrderSchema);

module.exports = Orders;
