// Base API URL - will need to be updated based on your backend service
const API_URL = 'http://localhost:5000/api';

// Function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
    return Promise.reject(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request:', error.request);
    return Promise.reject({ message: 'No response from server' });
  } else {
    // Something happened in setting up the request that triggered an Error
    return Promise.reject({ message: error.message });
  }
};

// Product API functions
export const productApi = {
  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Create a new product (admin only)
  createProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Update a product (admin only)
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  // Delete a product (admin only)
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default {
  productApi,
}; 