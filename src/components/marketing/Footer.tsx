import { Box, Typography } from "@mui/material";
import { polygons } from "../../assets";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "40vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#060816",
        maxWidth: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#060816",
          width: { xs: "90%", sm: "90%", lg: "1200px" },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "1.7rem",
              letterSpacing: ".3rem",
            }}
          >
            Chicken Tinder
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
            }}
          >
            Copyright @2023
          </Typography>
          <Typography>All Rights Reserved</Typography>
        </Box>
        <Box>
          <img src={polygons} alt="" style={{ width: "170px" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
