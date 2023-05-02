import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Create = () => {
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
          variant="h5"
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
            <TextField label="Party Name" fullWidth />
            <TextField label="Location" fullWidth />
            <TextField label="Max distance from location" fullWidth />
            <TextField label="Expiration Date" fullWidth />
            <Button
              variant="contained"
              fullWidth
              sx={{
                height: "50px",
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
