import {
  Box,
  Button,
  FormControl,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import NewPartyDialog from "./NewPartyDialog";
import { DateTimePicker } from "@mui/x-date-pickers";
import API from "../api";

const Create = () => {
  const [party, setParty] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    maxDistance: 10000,
    expirationDate: "",
    password: "",
  });

  const toMeters = (miles: number) => {
    const meters = miles * 1609.34;
    return Math.floor(meters);
  };

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  const createParty = async () => {
    try {
      const party = await API.createParty(formData);
      console.log(party);
      setOpen(true);
      setParty(party);
    } catch {
      console.log("error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {party && <NewPartyDialog open={open} setOpen={setOpen} party={party} />}
      <Box
        sx={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "500px",
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
            <Box sx={{ width: 400 }}>
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
            <DateTimePicker
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
                heigth: "50px",
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
  );
};

export default Create;
