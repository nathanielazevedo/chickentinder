import "./App.css";
import { theme } from "./theme";
import { router } from "./router";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
