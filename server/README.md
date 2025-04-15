# Product Catalog API Server

A RESTful API for managing a product catalog, built with Express.js and MongoDB.

## Features

- RESTful API endpoints for product operations (CRUD)
- MongoDB database integration
- Data validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-catalog
NODE_ENV=development
```

## Running the Server

To start the development server with hot reloading:

```bash
npm run dev
```

To start the production server:

```bash
npm start
```

## Database Seeding

To seed the database with sample products:

```bash
npm run seed
```

To clear all products from the database:

```bash
npm run seed:destroy
```

## API Endpoints

| Method | Endpoint          | Description                   |
|--------|-------------------|-------------------------------|
| GET    | /api/products     | Get all products              |
| GET    | /api/products/:id | Get a single product by ID    |
| POST   | /api/products     | Create a new product          |
| PUT    | /api/products/:id | Update a product              |
| DELETE | /api/products/:id | Delete a product              |

## Product Model

Each product has the following properties:

- `name` (String, required): Product name
- `price` (Number, required): Price of the product
- `description` (String, required): Brief product description
- `category` (String, required): Category of the product
- `stock` (Number, required): Available stock quantity
- `imageUrl` (String, required): URL of the product image
- `createdAt` (Date): Date when the product was created
- `updatedAt` (Date): Date when the product was last updated

## Technologies Used

- Express.js
- MongoDB with Mongoose
- Node.js 