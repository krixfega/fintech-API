# A Simple Financial Transaction API 

This project is a RESTful API for managing financial transactions within a Fintech application. The API allows users to create, retrieve, and list transactions with a focus on secure, efficient, and well-documented code. The project uses Node.js, Express, and MongoDB.

## Project Description

The Simple Financial Transaction API provides endpoints to manage financial transactions, including creating new transactions, retrieving transactions by ID, and listing all transactions with optional filtering by type and date range. The API also supports pagination for listing transactions.

### Endpoints

- `POST /api/transactions`: Create a new transaction.
- `GET /api/transactions/:id`: Retrieve a specific transaction by ID.
- `GET /api/transactions`: List all transactions.

### Transaction Model

- `id` (UUID): The auto-generated ID of the transaction.
- `amount` (Number): The amount of the transaction.
- `type` (String): The type of the transaction ("credit" or "debit").
- `description` (String): The description of the transaction.
- `date` (Date): The date of the transaction, defaulting to the current date.

### Security

The API uses basic authentication with a static username and password (user:password) to secure endpoints, ensuring only authenticated users can access them.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB (Atlas or local installation)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/financial-transaction-api.git
   cd financial-transaction-api

2.	Install the dependencies:
    ```sh
    npm install

3.	Create a .env file in the root directory and add the following environment variables:
    plaintext

    PORT=5000
    MONGO_URI=mongodb+srv://krixfega:1g0V0xTjTwoxkc0b@cluster0.cahiqpn.mongodb.net/fintech-API?retryWrites=true&w=majority
    
4. Start the server:
    ```sh
    npmrun dev

The server will start on the port specified in the .env file (default is 5001).

API Documentation

The API documentation is available through Swagger. Once the server is running, you can access the documentation at:
http://localhost:5001/api-docs

Swagger Annotations

The project uses Swagger annotations in the route files to document the API endpoints. The annotations provide details about the request parameters, request body, and responses.

How to Run Tests

The project includes a test suite to verify the functionality of the API endpoints. The tests use Jest and Supertest for testing.

1.	Ensure MongoDB is running.
2.	Run the tests:

    ```sh
    npm test

The test suite will create and delete transactions, retrieve transactions by ID, list all transactions, and filter transactions by type and date range.
