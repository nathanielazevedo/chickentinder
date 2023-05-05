import { Box, Typography } from "@mui/material";
// import baseUrl from "../api.js";
const localUrl = "http://localhost:5173/chickentinder/";
const prodUrl = "https://nathanielazevedo.github.io/chickentinder/";

const baseUrl = process.env.NODE_ENV === "development" ? localUrl : prodUrl;

export interface NewPartyDialog {
  party: any;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        sx={{
          fontWeight: "bold",
        }}
      >
        Let the swiping begin!
      </Typography>
      <Typography color="primary">
        Your party has been created! You can now start swiping.
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography color="primary">Send this link to your friends!</Typography>
        <a href={baseUrl + "party/" + party._id} target="_blank">
          <Typography
            color="primary"
            sx={{
              color: "blue",
              wordBreak: "break-all",
            }}
          >
            {baseUrl + "party/" + party._id}
          </Typography>
        </a>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Restaurants:
        </Typography>
        <Box
          sx={{
            marginLeft: "20px",
          }}
        >
          {party.restaurants.map((restaurant: any) => {
            return <Typography color="primary">{restaurant.name}</Typography>;
          })}
        </Box>
      </Box>
    </>
  );
};

export default NewPartyDialog;
