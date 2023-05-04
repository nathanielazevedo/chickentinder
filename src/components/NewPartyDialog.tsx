import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent, Typography } from "@mui/material";
// import baseUrl from "../api.js";
const localUrl = "http://localhost:3000/";
const prodUrl = "https://nathanielazevedo.github.io/chickentinder/";

const baseUrl = process.env.NODE_ENV === "development" ? localUrl : prodUrl;

export interface NewPartyDialog {
  open: boolean;
  setOpen: (value: boolean) => void;
  party: any;
}

const NewPartyDialog = ({ open, setOpen, party }: NewPartyDialog) => {
  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          Let the swiping begin!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your party has been created! You can now start swiping.
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography>Send this link to your friends!</Typography>
            <a href={baseUrl + party._id} target="_blank">
              <Typography
                sx={{
                  color: "blue",
                }}
              >
                {baseUrl + party._id}
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
                return <Typography>{restaurant.name}</Typography>;
              })}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewPartyDialog;
