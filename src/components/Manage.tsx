import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Results from "./Results";
import NavBar from "./Navbar";

const Manage = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [party, setParty] = useState<any>(undefined);

  useEffect(() => {
    fetch("http://localhost:6001/party/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setParty(data);
      });
    });
  }, [id]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {party && (
          <Box
            sx={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              {party.name}
            </Typography>
            <Results />
            <Button
              fullWidth
              sx={{
                heigth: "50px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
            >
              End voting
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Manage;
