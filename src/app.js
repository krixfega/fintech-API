const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fintech API',
      version: '1.0.0',
      description: 'API for managing financial transactions',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;