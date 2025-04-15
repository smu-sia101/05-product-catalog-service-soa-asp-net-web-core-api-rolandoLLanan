import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import StoreIcon from '@mui/icons-material/Store';

const Navbar = ({ cartItemsCount, onCartClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={1}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <StoreIcon 
              color="primary" 
              fontSize="large" 
              sx={{ mr: 1.5, display: { xs: 'none', sm: 'flex' } }} 
            />
            <Typography 
              variant="h5" 
              component={RouterLink} 
              to="/"
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Product Catalog
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
              >
                <MenuItem 
                  component={RouterLink} 
                  to="/" 
                  onClick={handleMenuClose}
                  selected={location.pathname === '/'}
                >
                  <ListItemIcon>
                    <HomeIcon color={location.pathname === '/' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/admin" 
                  onClick={handleMenuClose}
                  selected={location.pathname === '/admin'}
                >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon color={location.pathname === '/admin' ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </MenuItem>
                <MenuItem onClick={() => { onCartClick(); handleMenuClose(); }}>
                  <ListItemIcon>
                    <Badge badgeContent={cartItemsCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Cart" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/"
                startIcon={<HomeIcon />}
                variant={location.pathname === '/' ? 'contained' : 'text'}
                sx={{
                  color: location.pathname === '/' ? 'white' : 'text.primary',
                  backgroundColor: location.pathname === '/' ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: location.pathname === '/' ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Home
              </Button>
              
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/admin"
                startIcon={<AdminPanelSettingsIcon />}
                variant={location.pathname === '/admin' ? 'contained' : 'text'}
                sx={{
                  color: location.pathname === '/admin' ? 'white' : 'text.primary',
                  backgroundColor: location.pathname === '/admin' ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: location.pathname === '/admin' ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Admin
              </Button>
              
              <Button 
                color="primary"
                variant="outlined" 
                startIcon={
                  <Badge badgeContent={cartItemsCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                }
                onClick={onCartClick}
                sx={{ ml: 1 }}
              >
                Cart
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 