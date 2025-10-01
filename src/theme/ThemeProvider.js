import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use system preference
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      return savedMode;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Set html background color to match theme and prevent black overscroll in Safari
    const bgColor = mode === 'light' ? '#DAE0E6' : '#030303';
    document.documentElement.style.backgroundColor = bgColor;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
