import { Box, Button, Typography } from "@mui/material";
import { hero } from "../../assets";
import { Link } from "react-router-dom";

const Hero = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        maxWidth: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", lg: "flex-start" },
          alignItems: "center",
          backgroundColor: "#060816",
          maxWidth: { xs: "80%", sm: "90%", lg: "1200px" },
          width: { xs: "80%", sm: "100%", lg: "1200px" },
        }}
      >
        <Box sx={{ width: "500px", zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }} mb={0.5}>
            Where are we eating?
          </Typography>
          <Typography mb={3}>
            Chicken Tinder is an app to help you and your friends decide where
            to eat. Treat making decisions as a dating app. Swipe right on the
            restaurants you like and left on the ones you don't. Once everyone
            has swiped, the app will show you the restaurants that everyone
            liked.
          </Typography>
          <Link to="/create">
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "50px",
                fontSize: "1rem",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
              onClick={() => setOpen(true)}
            >
              Create a Party
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
          }}
        >
          <img
            src={hero}
            alt=""
            style={{
              width: "600px",
              borderRadius: "50%",
              marginBottom: "200px",
              position: "absolute",
              top: "100px",
              right: "100px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
