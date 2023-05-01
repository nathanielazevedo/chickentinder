import "./App.css";
import { theme } from "./theme";
import { router } from "./router";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

const App = () => (
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
