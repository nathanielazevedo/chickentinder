import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PasswordDialog from "./PasswordDialog";
import Navbar from "./Navbar";

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        <PasswordDialog open={open} setOpen={setOpen} />
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            borderRadius: "20px",
            width: "500px",
            gap: "40px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "black",
              alignSelf: "flex-start",
            }}
          >
            What are you here for?
          </Typography>
          <Link
            to={`/party/${id}/vote`}
            style={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "50px",
                fontSize: "1rem",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
            >
              Vote
            </Button>
          </Link>
          <Link
            to={`/party/${id}/results`}
            style={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "50px",
                fontSize: "1rem",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
            >
              View Results
            </Button>
          </Link>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpen(true)}
            sx={{
              height: "50px",
              fontSize: "1rem",
              background:
                "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
            }}
          >
            Manage Party
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Entry;
