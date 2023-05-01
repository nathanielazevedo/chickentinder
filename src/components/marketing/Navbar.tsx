import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const pages = ["Login"];

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container sx={styles.container}>
        <Toolbar disableGutters>
          <Link to="/intro">
            <Typography variant="h6" noWrap sx={styles.name}>
              CHICKEN TINDER
            </Typography>
          </Link>
          <Box sx={styles.linksContainer}>
            {pages.map((page) => {
              return (
                <Button
                  variant="contained"
                  sx={{
                    width: "20%",
                    fontSize: "1rem",
                    background:
                      "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
                  }}
                >
                  Get Started
                </Button>
              );
            })}
          </Box>
          <Box sx={styles.menuContainer}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "50px",
                fontSize: "1rem",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
            >
              Get Started
            </Button>
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
    fontSize: "1.7rem",
    letterSpacing: ".3rem",
  },
  linksContainer: {
    flexGrow: 1,
    display: { xs: "none", lg: "flex" },
    justifyContent: "flex-end",
  },
  menuContainer: {
    flexGrow: 1,
    display: { xs: "flex", lg: "none" },
    justifyContent: "flex-end",
  },
};
