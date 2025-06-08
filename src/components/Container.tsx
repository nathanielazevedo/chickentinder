import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Container = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        sx={{
          overflow: "hidden",
          width: { xs: "95%" },
          maxHeight: { xs: "100%" },
          padding: { xs: "70px 0px" },
          minHeight: { xs: "calc(100vh - 56px)" },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Container;
