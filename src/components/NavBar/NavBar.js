import logo from '../../reddit-logo.png';
import Search from '../Search/Search';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Container,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { useThemeMode } from '../../theme/ThemeProvider';

function NavBar() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { path: 'r/reddit/', label: 'r/reddit' },
    { path: 'r/help/', label: 'r/help' },
    { path: 'r/redditdev/', label: 'r/redditdev' },
    { path: 'r/bugs/', label: 'r/bugs' },
  ];

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      sx={{ 
        bgcolor: 'background.paper',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: 'relative', justifyContent: 'space-between', gap: 1 }}>
          {/* Mobile layout: Menu - Search - Logo */}
          {isMobile ? (
            <>
              {/* Left: Menu button */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{ p: 1, pl: 0 }}
              >
                <MenuIcon />
              </IconButton>

              {/* Center: Search */}
              <Box sx={{ flex: 1 }}>
                <Search fullWidth />
              </Box>

              {/* Right: Logo */}
              <IconButton
                component={NavLink}
                to="/"
                sx={{ p: 1, pr: 0 }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Reddit logo"
                  sx={{
                    height: 32,
                    width: 32,
                  }}
                />
              </IconButton>

              {/* Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    onClick={handleMenuClose}
                    sx={{
                      '&.active': {
                        bgcolor: 'action.selected',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem onClick={() => { toggleTheme(); handleMenuClose(); }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                    {mode === 'dark' ? 'Light mode' : 'Dark mode'}
                  </Box>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Desktop layout: Logo on left, Search absolutely centered, Links on right */}
              {/* Left: Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, zIndex: 2 }}>
                <IconButton
                  component={NavLink}
                  to="/"
                  sx={{ p: 0, m: 0 }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="Reddit logo"
                    sx={{
                      height: 32,
                      width: 32,
                    }}
                  />
                </IconButton>
                <Box
                  component={NavLink}
                  to="/"
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: 'primary.main',
                    }}
                  >
                    reddit client
                  </Box>
                </Box>
              </Box>

              {/* Center: Search - absolutely centered */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
                <Search />
              </Box>

              {/* Right: Links + Theme button */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 0.5, lg: 1 }, zIndex: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    sx={{
                      position: 'relative',
                      color: 'text.primary',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: { md: 1, lg: 2 },
                      '&.active': {
                        color: 'primary.main',
                      },
                      '&.active::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
                  <IconButton onClick={toggleTheme} color="inherit" sx={{ p: 0 }}>
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;