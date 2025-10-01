import { createTheme } from '@mui/material/styles';

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF4500',
      light: '#FF5700',
      dark: '#CC3700',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0079D3',
      light: '#5BA4DC',
      dark: '#005FA3',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#DAE0E6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1c1c1c',
      secondary: '#7c7c7c',
    },
    divider: '#EDEFF1',
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 121, 211, 0.08)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '6px 16px',
          fontWeight: 700,
          fontSize: '0.875rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          border: '1px solid #EDEFF1',
          '&:hover': {
            border: '1px solid #CCCCCC',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F6F7F8',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1536,
    },
  },
});

// Dark theme (Reddit dark mode)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4500',
      light: '#FF5700',
      dark: '#CC3700',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0079D3',
      light: '#5BA4DC',
      dark: '#005FA3',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#030303',
      paper: '#1A1A1B',
    },
    text: {
      primary: '#D7DADC',
      secondary: '#9A9B9C',
    },
    divider: '#343536',
    action: {
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(0, 121, 211, 0.12)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '6px 16px',
          fontWeight: 700,
          fontSize: '0.875rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: '16px',
          border: '1px solid #343536',
          backgroundColor: '#1A1A1B',
          '&:hover': {
            border: '1px solid #4A4B4C',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #343536',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#272729',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#1A1A1B',
            },
            '&.Mui-focused': {
              backgroundColor: '#1A1A1B',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1A1A1B',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1536,
    },
  },
});
