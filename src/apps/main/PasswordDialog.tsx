import API from '../../api';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function FormDialog({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [password, setPassword] = useState('');

  const checkPassword = async () => {
    if (!id) return;
    const response = await API.validatePassword(id, password);
    if (response) {
      setOpen(false);
      navigate('/party/' + id + '/manage');
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Enter the password to manage this party</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='Password'
          label='Password'
          fullWidth
          variant='standard'
          onChange={(e) => setPassword(e.target.value)}
          error={error}
          helperText={error ? 'Incorrect password' : ''}
          value={password}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={checkPassword}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
