import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PasswordDialog from "./PasswordDialog";
import Navbar from "./Navbar";
import API from "../api";

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [party, setParty] = useState({} as any);

  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      const res = await API.getParty(id);
      setParty(res);
    };
    getParty();
  }, [id]);

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
            // backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            borderRadius: "20px",
            width: { xs: "100%", sm: "500px" },
            gap: "40px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              alignSelf: "flex-start",
            }}
          >
            What are you here for?
          </Typography>
          <Link
            to={party.winner ? `/party/${id}/` : `/party/${id}/vote`}
            style={{
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              disabled={party.winner ? true : false}
              sx={{
                height: "50px",
                fontSize: "14px",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
            >
              {party.winner ? "Winner Chosen" : "Vote"}
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
                fontSize: "14px",
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
              fontSize: "14px",
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
