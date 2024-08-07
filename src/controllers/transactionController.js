const Transaction = require('../models/transactionModel');

const createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const transaction = new Transaction({ amount, type, description });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ id });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = {};

    if (type) {
      query.type = type;
    }

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  listTransactions,
};