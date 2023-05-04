import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormDialog({ open, setOpen }: any) {
  const { id } = useParams<{ id: string }>();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const checkPassword = () => {
    fetch("http://localhost:6001/party/" + id + "/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    }).then((res) => {
      if (res.status === 200) {
        setOpen(false);
        navigate("/party/" + id + "/manage");
      } else {
        setError(true);
      }
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter the password to manage this party</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Password"
            label="Password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            helperText={error ? "Incorrect password" : ""}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={checkPassword}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
