import { Box, Button, Typography } from "@mui/material";
import { globalStyles } from "../../styles";
import { Link } from "react-router-dom";

const SectionOne = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box sx={{ width: { xs: "90%", md: "50%" } }}>
          <Typography color="black" variant="h4" fontWeight="bold" mb={1}>
            Get Started Now
          </Typography>
          <Typography color="black">
            Chicken Tinder is easy to use and doesn't require an account. Just
            generate a new link and share it with your friends.
          </Typography>
        </Box>
        <Box sx={styles.imageContainer}>
          <Link
            to="/create"
            style={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "50px",
                marginTop: "20px",
                background: globalStyles.gradientBg,
              }}
            >
              Create a Party
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionOne;

const styles = {
  container: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "70px 0 ",
    borderRadius: "10px",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", lg: "row" },
    alignItems: "center",
    width: { xs: "90%", lg: "100%" },
    maxWidth: "1200px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "90%", md: "40%" },
    paddingTop: { xs: "50px", lg: "0" },
  },
};
