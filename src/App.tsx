import './App.css';
import { themeSettings } from './theme';
import { router } from './router';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMemo } from 'react';

const App = () => {
  const mode = localStorage.getItem('mode');
  if (!mode) {
    localStorage.setItem('mode', 'light');
  }
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
