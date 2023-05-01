import { Box, Typography } from "@mui/material";
import { polygons } from "../../assets";

const SignInHeader = () => {
  return (
    <Box sx={styles.container}>
      <img src={polygons} style={{ width: "100px" }} />
      <Typography variant="h6" noWrap sx={styles.name}>
        AgriSync
      </Typography>
    </Box>
  );
};

export default SignInHeader;

const styles = {
  container: {
    marginTop: { xs: "5%", md: "40%" },
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  name: {
    ml: 2,
    fontWeight: 400,
    fontSize: "1.7rem",
    letterSpacing: ".3rem",
  },
};
