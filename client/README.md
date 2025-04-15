# Product Catalog Client

A React-based client application for the Product Catalog service. Built with React, Material UI, and Vite.

## Features

- Display products from the API
- Shopping cart functionality
- Modern UI with Material UI components
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Installation

1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

By default, the application expects the API to be running at `http://localhost:5000/api`. If your API is running on a different URL, you can update it in `src/services/api.js`.

## Technologies Used

- React 19
- Material UI
- Vite
- Fetch API for data fetching
