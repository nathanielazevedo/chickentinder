import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container sx={styles.container}>
        <Toolbar disableGutters>
          <Link to="/">
            <Typography variant="h6" noWrap sx={styles.name}>
              CHICKEN TINDER
            </Typography>
          </Link>
          <Box sx={styles.menuContainer}>
            <Link to="create">
              <Button
                color="primary"
                variant="contained"
                sx={{
                  width: "100%",
                  height: "30px",
                  fontSize: { xs: "12px", sm: "16px" },
                  background:
                    "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
                }}
              >
                Create a Party
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

const styles = {
  container: {
    width: { xs: "100%", lg: "1200px" },
  },
  name: {
    mr: 2,
    fontWeight: 400,
    fontSize: { xs: "12px", sm: "16px" },
    letterSpacing: ".3rem",
  },
  linksContainer: {
    flexGrow: 1,
    display: { xs: "none", lg: "flex" },
    justifyContent: "flex-end",
  },
  menuContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
};
