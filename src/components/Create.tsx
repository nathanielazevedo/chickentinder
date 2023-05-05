import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import { DateTimePicker } from "@mui/x-date-pickers";
import API from "../api";
import Navbar from "./Navbar";
import dayjs from "dayjs";
import NewPartyScreen from "./NewPartyScreen";

const Create = () => {
  const [party, setParty] = useState(undefined);
  const setOpen = useState(false)[1];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    maxDistance: 10000,
    expirationDate: dayjs("2023-05-15T15:30"),
    maxVoters: "",
    password: "",
  });

  console.log(formData);

  const toMeters = (miles: number) => {
    const meters = miles * 1609.34;
    return Math.floor(meters);
  };

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  const createParty = async () => {
    setLoading(true);
    try {
      const party = await API.createParty(formData);
      setOpen(true);
      setParty(party);
      setLoading(false);
    } catch {
      console.log("error");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 70px)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              width: { xs: "100%", sm: "500px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="success" />
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  if (party) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 70px)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "20px",
              width: { xs: "100%", sm: "500px" },
            }}
          >
            <NewPartyScreen party={party} />
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* <ThemeProvider theme={darkTheme}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 70px)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: { xs: 0, sm: "20px" },
            width: { xs: "100%", sm: "500px" },
            height: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography
            color="primary"
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Create a Party
          </Typography>
          <Box>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <TextField
                label="Party Name"
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <TextField
                label="City Name or Zip Code"
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                }}
              />
              <Box sx={{ width: { xs: 300, md: 400 } }}>
                <Typography
                  id="slider"
                  gutterBottom
                  sx={{
                    color: "grey",
                  }}
                >
                  Max Distance From Location (miles)
                </Typography>
                <Slider
                  value={toMiles(formData.maxDistance)}
                  aria-label="slider"
                  valueLabelDisplay="auto"
                  min={1}
                  step={1}
                  max={24}
                  onChange={(_e, value) => {
                    const inKm = toMeters(value as number);
                    setFormData({ ...formData, maxDistance: inKm as number });
                  }}
                />
              </Box>
              {/* <DateTimePicker
                label="Expiration Date"
                sx={{
                  width: "100%",
                }}
                value={formData.expirationDate}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(newValue: any) =>
                  setFormData({ ...formData, expirationDate: newValue })
                }
                slotProps={{
                  textField: {
                    helperText: "This is when the party will complete.",
                  },
                }}
              /> */}
              <TextField
                label="Number of Voters"
                fullWidth
                onChange={(e) => {
                  setFormData({ ...formData, maxVoters: e.target.value });
                }}
                helperText="Voting will end when this many people have voted. Leave blank for no limit."
              />
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  label="Password"
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  helperText="You can use this password later to manage this party."
                />
              </Box>
              <Button
                onClick={createParty}
                variant="contained"
                fullWidth
                sx={{
                  height: "50px",
                  fontSize: "1rem",
                  background:
                    "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
                }}
              >
                Create Party
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Create;
