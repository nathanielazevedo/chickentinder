import './App.css'
import { router } from './router'
import { theme } from './theme'
import { inject } from '@vercel/analytics'
import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

inject()

const App = () => (
  <ThemeProvider theme={createTheme(theme)}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
)

export default App
