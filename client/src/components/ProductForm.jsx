import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  MenuItem, 
  Grid,
  Divider,
  InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Toys',
  'Sports',
  'Beauty',
  'Health',
  'Automotive',
  'Accessories',
  'Fitness',
  'Sportswear'
];

const initialFormState = {
  name: '',
  price: '',
  description: '',
  category: '',
  stock: '',
  imageUrl: ''
};

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const isEditMode = !!product?._id;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        stock: product.stock || '',
        imageUrl: product.imageUrl || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.stock && (isNaN(Number(formData.stock)) || Number(formData.stock) < 0)) {
      newErrors.stock = 'Stock must be a non-negative number';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert price and stock to numbers
      const submissionData = {
        ...formData,
        price: Number(formData.price),
        stock: formData.stock ? Number(formData.stock) : 0
      };
      
      onSubmit(submissionData);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isEditMode 
            ? 'Update the product information below' 
            : 'Fill in the details to add a new product to your catalog'}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Product Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon color="primary" />
                  </InputAdornment>
                )
              }}
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              select
              label="Category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.category}
              helperText={errors.category}
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="stock"
              label="Stock Quantity"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.stock}
              helperText={errors.stock}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="imageUrl"
              label="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
            />
          </Grid>
          
          {formData.imageUrl && (
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 1,
                  border: '1px dashed',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Image Preview:
                </Typography>
                <Box
                  component="img"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    border: '1px solid #ddd',
                    borderRadius: 1
                  }}
                  src={formData.imageUrl}
                  alt="Product Preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/120?text=Invalid+Image+URL';
                  }}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button 
                type="button" 
                variant="outlined" 
                color="secondary"
                onClick={onCancel}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                startIcon={<SaveIcon />}
                size="large"
              >
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ProductForm; 