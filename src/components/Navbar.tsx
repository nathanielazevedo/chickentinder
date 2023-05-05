import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ResponsiveAppBar({ showButton = true }: { showButton?: boolean }) {
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
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontWeight: 400,
                fontSize: { xs: "10px", sm: "16px" },
                letterSpacing: ".3rem",
                cursor: "pointer",
              }}
            >
              CHICKEN TINDER
            </Typography>
          </Link>
          {showButton && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                display: "flex",
                height: "25px",
              }}
            >
              <Typography
                fontSize="15px"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </Typography>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
