import React from "react";
import API from "../../../api";
import { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useParams } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch } from "../../../state/redux";
import { endParty as rEndParty } from "../../../state";
import { Party } from "../../../models/Party";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  party: Party;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function FormDialog({ open, setOpen, party }: Props) {
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const endParty = async () => {
    try {
      if (!id || !party) return;
      dispatch(rEndParty(id));
      await API.endParty(id);
    } catch (err) {
      console.log(err);
    }
  };

  const checkPassword = async () => {
    if (!id) return;
    const response = await API.validatePassword(id, password);
    if (response) {
      console.log("end party");
      endParty();
    } else setError(true);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: "20px",
          backgroundImage: "none",
        },
      }}
    >
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          error={error}
          margin="dense"
          label="Password"
          value={password}
          variant="outlined"
          helperText={error && "Incorrect password"}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Button onClick={checkPassword}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
