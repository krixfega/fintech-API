const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;