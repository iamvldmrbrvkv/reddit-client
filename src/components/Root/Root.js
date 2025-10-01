import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

function Root() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Toolbar /> {/* Spacer for fixed AppBar */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          py: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Root;