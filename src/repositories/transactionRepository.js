const Transaction = require('../models/transactionModel');

class TransactionRepository {
  async create(transactionData) {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  }

  async findById(id) {
    return await Transaction.findOne({ id });
  }

  async findAll(filters, pagination) {
    const query = {};

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.startDate && filters.endDate) {
      query.date = { $gte: new Date(filters.startDate), $lte: new Date(filters.endDate) };
    }

    const { page = 1, limit = 10 } = pagination;
    return await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
  }
}

module.exports = new TransactionRepository();