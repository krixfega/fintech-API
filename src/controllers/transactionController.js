const transactionRepository = require('../repositories/transactionRepository');

const createTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const transaction = await transactionRepository.create({ amount, type, description });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionRepository.findById(id);

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
    const { type, startDate, endDate, page, limit } = req.query;
    const filters = { type, startDate, endDate };
    const pagination = { page, limit };

    const transactions = await transactionRepository.findAll(filters, pagination);
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