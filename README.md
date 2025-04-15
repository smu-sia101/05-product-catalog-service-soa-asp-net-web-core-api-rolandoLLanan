[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vWeu2Z3_)
# 📌 ProductCatalog Service Instructions

## 📚 Overview
The **ProductCatalog Service** is a RESTful API that allows managing a catalog of products. It follows **SOA (Service-Oriented Architecture)** principles and uses **MongoDB** as the database.  

---

## 🛠 Endpoints

| Method  | Endpoint                 | Description                      |
|---------|--------------------------|----------------------------------|
| **GET**  | `/api/products`          | Get all products                |
| **GET**  | `/api/products/{id}`     | Get a single product by ID      |
| **POST** | `/api/products`          | Create a new product            |
| **PUT**  | `/api/products/{id}`     | Update a product                |
| **DELETE** | `/api/products/{id}`  | Delete a product                |

---

## 📂 Product Model
Each **product** will have the following properties:  

| Property    | Type     | Description                          |
|------------|---------|--------------------------------------|
| **Id**      | string  | Unique identifier (MongoDB ObjectId) |
| **Name**    | string  | Product name                         |
| **Price**   | decimal | Price of the product                 |
| **Description** | string  | Brief product description      |
| **Category** | string  | Category of the product             |
| **Stock**   | int     | Available stock quantity            |
| **ImageUrl** | string  | URL of the product image            |

---

## 📌 Requirements
1. **.NET 7+** (for building the API)  
2. **MongoDB** (for storing products)  
3. **Postman** or **Curl** (for testing the API)  

---

## 📂 API Functionalities
- **Retrieve** all products from MongoDB.  
- **Get** a specific product by ID.  
- **Add** a new product.  
- **Update** an existing product.  
- **Delete** a product by ID.  

---

## 🎨 UI Development Instructions
Create a **frontend application** using any framework of your choice (**React, Angular, Vue, or Next.js**). The UI should:
- Consume the **ProductCatalog Service** endpoints.
- Display the list of products with their **image, name, description, price, and stock**.
- Provide a form to **add, update, and delete** products.
- Handle API responses and display error messages appropriately.

---

## 🔹 Additional Notes
- The API uses **MongoDB** for storage instead of SQL databases.  
- The API follows **RESTful principles**.  
- Responses are returned in **JSON format**.  

---

# Product Catalog Service

A complete product catalog service with a RESTful API backend and a React frontend.

## Project Structure

This project is divided into two main parts:

1. **Server**: An Express.js application with MongoDB that provides RESTful API endpoints for managing products.
2. **Client**: A React application built with Vite and Material UI that consumes the API and provides a user interface.

## Features

- RESTful API endpoints for CRUD operations on products
- MongoDB database for product storage
- Responsive React frontend with Material UI
- Shopping cart functionality
- API service layer with error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm (v6 or higher)

## Getting Started

### 1. Setting up the Server

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-catalog
NODE_ENV=development
```

Start the development server:

```bash
npm run dev
```

### 2. Setting up the Client

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The client application will be available at http://localhost:5173

## Database Seeding

To populate the database with sample products:

```bash
cd server
npm run seed
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

- `name` (String): Product name
- `price` (Number): Price of the product
- `description` (String): Brief product description
- `category` (String): Category of the product
- `stock` (Number): Available stock quantity
- `imageUrl` (String): URL of the product image

## Technologies Used

- **Backend**:
  - Express.js
  - MongoDB with Mongoose
  - Node.js

- **Frontend**:
  - React
  - Material UI
  - Vite

---
