import './App.css';
import { router } from './router';
import { themeSettings } from './theme';
import { inject } from '@vercel/analytics';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

inject();

const App = () => {
  const theme = createTheme(themeSettings());
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
