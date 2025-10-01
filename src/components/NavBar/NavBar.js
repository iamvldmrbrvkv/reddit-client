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
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  height: { xs: 32, md: 40 },
                  width: { xs: 32, md: 40 },
                }}
              />
            </IconButton>
            <Box
              component={NavLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  fontSize: { sm: '1.25rem', md: '1.5rem' },
                  color: 'text.primary',
                }}
              >
                Reddit Client
              </Box>
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mx: 2 }}>
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
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Search />
            <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={toggleTheme} color="inherit" sx={{ p: 0 }}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {isMobile && (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0, m: 0 }}
                >
                  <MenuIcon />
                </IconButton>
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
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;