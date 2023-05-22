import Dialog from '@mui/material/Dialog'
import { DialogActions, Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import MainButton from '../../../components/MainButton'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const NewPartyDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: '20px',
          backgroundImage: 'none',
          backgroundColor: 'black',
          border: '1px solid #0e6b7d',
        },
      }}
    >
      <DialogTitle variant='h4'>Welcome to the party</DialogTitle>
      <DialogContent>
        <Typography color='secondary'>
          This is your party's page. You can vote, view results, and manage your
          party here. Share the link with your friends!
        </Typography>
      </DialogContent>
      <DialogActions>
        <MainButton onClick={() => setOpen(false)} text='Got it' />
      </DialogActions>
    </Dialog>
  )
}

export default NewPartyDialog
