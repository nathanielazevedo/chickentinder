import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import MainButton from '../../../components/MainButton'
import { DialogActions, Typography } from '@mui/material'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const MyVoteConfirmation = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: '20px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle variant='h4'>Awesome</DialogTitle>
      <DialogContent>
        <Typography color='secondary'>
          Your vote has been successfully submitted
        </Typography>
      </DialogContent>
      <DialogActions>
        <MainButton onClick={() => setOpen(false)} text='Got it' />
      </DialogActions>
    </Dialog>
  )
}

export default MyVoteConfirmation
