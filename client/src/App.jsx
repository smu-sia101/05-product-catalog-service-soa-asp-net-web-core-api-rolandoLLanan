import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { 
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Admin from './components/Admin'
import { productApi } from './services/api'

// Create a theme instance with improved colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5722', // Deep orange
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

function App() {
  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products from API
        const data = await productApi.getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        
        // Show error notification
        setNotification({
          open: true,
          message: 'Failed to load products. Using demo data instead.',
          severity: 'error'
        });
        
        // Load demo products for fallback
        setProducts([
          { _id: '1', id: 1, name: 'Demo Product 1', description: 'This is a demo product', price: 19.99, imageUrl: 'https://via.placeholder.com/300/2E7D32/FFFFFF?text=Product+1', category: 'Electronics', stock: 10 },
          { _id: '2', id: 2, name: 'Demo Product 2', description: 'This is a demo product', price: 29.99, imageUrl: 'https://via.placeholder.com/300/4CAF50/FFFFFF?text=Product+2', category: 'Clothing', stock: 5 },
          { _id: '3', id: 3, name: 'Demo Product 3', description: 'This is a demo product', price: 39.99, imageUrl: 'https://via.placeholder.com/300/1B5E20/FFFFFF?text=Product+3', category: 'Home & Kitchen', stock: 15 },
          { _id: '4', id: 4, name: 'Demo Product 4', description: 'This is a demo product', price: 49.99, imageUrl: 'https://via.placeholder.com/300/388E3C/FFFFFF?text=Product+4', category: 'Accessories', stock: 8 },
        ]);
      }
    };
    
    fetchProducts();
  }, []);

  // Add to cart function
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id || item._id === product._id);
    
    if (existingItem) {
      // If product already in cart, increase quantity
      setCartItems(cartItems.map(item => 
        (item.id === product.id || item._id === product._id)
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      // Add new product to cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    // Show notification
    setNotification({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
  };

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle cart click - For now just show a notification with cart contents
  const handleCartClick = () => {
    if (cartItems.length === 0) {
      setNotification({
        open: true,
        message: 'Your cart is empty',
        severity: 'info'
      });
    } else {
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setNotification({
        open: true,
        message: `Cart total: $${total.toFixed(2)}`,
        severity: 'info'
      });
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          flexGrow: 1, 
          backgroundColor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Navbar 
            cartItemsCount={cartItemsCount} 
            onCartClick={handleCartClick} 
          />
          
          <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
            <Routes>
              <Route 
                path="/" 
                element={
                  loading ? (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        minHeight: '60vh' 
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <ProductList 
                      products={products} 
                      onAddToCart={handleAddToCart} 
                    />
                  )
                } 
              />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Box>
          
          {/* Footer */}
          <Paper 
            component="footer" 
            square 
            variant="outlined" 
            sx={{ 
              mt: 'auto', 
              py: 2, 
              textAlign: 'center',
              borderTop: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Product Catalog | All Rights Reserved
            </Typography>
          </Paper>
          
          {/* Notification */}
          <Snackbar 
            open={notification.open} 
            autoHideDuration={3000} 
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity={notification.severity}
              elevation={6}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </Router>
  )
}

export default App
