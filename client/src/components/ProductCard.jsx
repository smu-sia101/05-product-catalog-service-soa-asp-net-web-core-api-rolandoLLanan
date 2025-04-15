import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';

const ProductCard = ({ product, onAddToCart }) => {
  // Ensure price is formatted properly
  const displayPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : parseFloat(product.price).toFixed(2);

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      
      {product.stock > 0 ? (
        <Chip 
          label={`In Stock: ${product.stock}`}
          color="primary"
          size="small"
          icon={<InventoryIcon />}
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12,
            backgroundColor: 'rgba(46, 125, 50, 0.85)',
            fontWeight: 500
          }}
        />
      ) : (
        <Chip 
          label="Out of Stock"
          color="error"
          size="small"
          icon={<InventoryIcon />}
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12,
            backgroundColor: 'rgba(211, 47, 47, 0.85)',
            fontWeight: 500
          }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h2" 
              sx={{ fontWeight: 600, lineHeight: 1.2, mb: 0 }}
            >
              {product.name}
            </Typography>
            {product.category && (
              <Chip
                label={product.category}
                size="small"
                icon={<LocalOfferIcon fontSize="small" />}
                variant="outlined"
                color="secondary"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ minHeight: '40px', mb: 1 }}
          >
            {product.description}
          </Typography>
        </Stack>
      </CardContent>
      
      <Divider />
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          ${displayPrice}
        </Typography>
        
        <Button 
          variant="contained"
          size="medium"
          disabled={product.stock === 0}
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
          sx={{ px: 2 }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard; 