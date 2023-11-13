const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required.'],
  },
  transactionType: {
    type: String,
    required: [true, 'Transaction type is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const transactiondetails = mongoose.model('transactiondetails', transactionSchema);

module.exports = transactiondetails;