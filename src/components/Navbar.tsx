import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" elevation={0}>
      <Container sx={{ width: { xs: "100%", lg: "1200px" } }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 400,
              fontSize: "1.7rem",
              letterSpacing: ".3rem",
            }}
          >
            CHICKEN TINDER
          </Typography>
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
