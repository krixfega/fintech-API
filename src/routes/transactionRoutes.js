const express = require('express');
const {
  createTransaction,
  getTransactionById,
  listTransactions,
} = require('../controllers/transactionController');
const basicAuth = require('../middleware/basicAuthMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - type
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the transaction
 *         amount:
 *           type: number
 *           description: The amount of the transaction
 *         type:
 *           type: string
 *           description: The type of the transaction (credit or debit)
 *         description:
 *           type: string
 *           description: The description of the transaction
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the transaction
 *       example:
 *         id: d5fE_asz
 *         amount: 100
 *         type: credit
 *         description: Salary
 *         date: 2024-01-01T00:00:00.000Z
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The transaction was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', basicAuth, createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: The transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/:id', basicAuth, getTransactionById);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get a list of transactions
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: The type of transaction (credit or debit)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for filtering transactions
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for filtering transactions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of transactions per page
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', basicAuth, listTransactions);

module.exports = router;