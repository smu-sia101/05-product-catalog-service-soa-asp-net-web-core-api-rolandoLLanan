import { Grid, Typography, Container, Box, Divider } from '@mui/material';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
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
          Products Catalog
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ maxWidth: '700px', mx: 'auto', mt: 1 }}
        >
          Browse our selection of high-quality products
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 6 }} />
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id || product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          </Grid>
        ))}
      </Grid>
      
      {products.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No products available at this time.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ProductList; 