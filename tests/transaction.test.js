const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Transaction = require('../src/models/transactionModel');

const authHeader = `Basic ${Buffer.from('user:password').toString('base64')}`;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Transaction.deleteMany({});
});

describe('Transaction API', () => {
  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', authHeader)
      .send({
        amount: 100,
        type: 'credit',
        description: 'Salary',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(100);
    expect(res.body.type).toBe('credit');
  });

  it('should retrieve a transaction by ID', async () => {
    const transaction = new Transaction({
      amount: 200,
      type: 'debit',
      description: 'Grocery',
    });
    await transaction.save();

    const res = await request(app)
      .get(`/api/transactions/${transaction.id}`)
      .set('Authorization', authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(200);
    expect(res.body.type).toBe('debit');
  });

  it('should list all transactions', async () => {
    const transaction1 = new Transaction({
      amount: 300,
      type: 'credit',
      description: 'Freelance',
    });
    const transaction2 = new Transaction({
      amount: 150,
      type: 'debit',
      description: 'Rent',
    });
    await transaction1.save();
    await transaction2.save();

    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(2);
  });

  it('should filter transactions by type', async () => {
    const transaction1 = new Transaction({
      amount: 300,
      type: 'credit',
      description: 'Freelance',
    });
    const transaction2 = new Transaction({
      amount: 150,
      type: 'debit',
      description: 'Rent',
    });
    await transaction1.save();
    await transaction2.save();

    const res = await request(app)
      .get('/api/transactions?type=credit')
      .set('Authorization', authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].type).toBe('credit');
  });

  it('should filter transactions by date range', async () => {
    const transaction1 = new Transaction({
      amount: 300,
      type: 'credit',
      description: 'Freelance',
      date: new Date('2024-01-01'),
    });
    const transaction2 = new Transaction({
      amount: 150,
      type: 'debit',
      description: 'Rent',
      date: new Date('2024-02-01'),
    });
    await transaction1.save();
    await transaction2.save();

    const res = await request(app)
      .get('/api/transactions?startDate=2024-01-01&endDate=2024-01-31')
      .set('Authorization', authHeader);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].date).toBe(transaction1.date.toISOString());
  });
});