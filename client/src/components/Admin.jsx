import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Tooltip,
  Divider,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductForm from './ProductForm';
import { productApi } from '../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
      showNotification('Failed to load products', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const handleAddNewClick = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (currentProduct) {
        // Update existing product
        await productApi.updateProduct(currentProduct._id, formData);
        showNotification(`Product "${formData.name}" updated successfully`);
      } else {
        // Create new product
        await productApi.createProduct(formData);
        showNotification(`Product "${formData.name}" added successfully`);
      }
      setShowForm(false);
      setCurrentProduct(null);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error saving product:', err);
      showNotification(`Failed to save product: ${err.message}`, 'error');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await productApi.deleteProduct(productToDelete._id);
      showNotification(`Product "${productToDelete.name}" deleted successfully`);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error deleting product:', err);
      showNotification(`Failed to delete product: ${err.message}`, 'error');
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexDirection: 'column',
            height: '50vh' 
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Loading products...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Typography color="error" variant="h5" gutterBottom>
            Error Loading Products
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={fetchProducts} 
            sx={{ mt: 2 }}
            size="large"
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} textAlign="center">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            position: 'relative',
            display: 'inline-block',
            pb: 1,
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '60px',
              height: '3px',
              bottom: 0,
              left: 'calc(50% - 30px)',
              backgroundColor: 'primary.main',
              borderRadius: '2px'
            }
          }}
        >
          Product Management
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ maxWidth: '700px', mx: 'auto', mt: 1 }}
        >
          Add, edit, or remove products from your catalog
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddNewClick}
          size="large"
        >
          Add New Product
        </Button>
      </Box>

      {showForm && (
        <ProductForm 
          product={currentProduct} 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelForm} 
        />
      )}

      {products.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', my: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add your first product using the button above.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddNewClick}
          >
            Add New Product
          </Button>
        </Paper>
      ) : (
        <TableContainer 
          component={Paper} 
          elevation={2}
          sx={{ 
            overflow: 'hidden',
            borderRadius: 2,
            '& .MuiTableCell-head': {
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow 
                  key={product._id}
                  sx={{ 
                    backgroundColor: index % 2 ? 'rgba(0, 0, 0, 0.02)' : 'white',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                  }}
                >
                  <TableCell>
                    <Box
                      component="img"
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                      src={product.imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60?text=No+Image';
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Product">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditClick(product)}
                        sx={{ 
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          mr: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.2)',
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton 
                        color="error" 
                        onClick={() => handleDeleteClick(product)}
                        sx={{ 
                          backgroundColor: 'rgba(211, 47, 47, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.2)',
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 2,
            maxWidth: 400
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'error.main', 
            color: 'white', 
            pb: 2 
          }}
        >
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText>
            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCancelDelete} 
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained" 
            autoFocus
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={5000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          elevation={6}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Admin; 