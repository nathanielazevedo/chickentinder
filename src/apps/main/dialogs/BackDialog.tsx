import Dialog from '@mui/material/Dialog'
import { Box, DialogActions, Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import MainButton from '../../../components/MainButton'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  handleBack: (res: string) => void
}

const BackDialog = ({ open, setOpen, handleBack }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      PaperProps={{
        style: {
          padding: '10px 0px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle variant='h4'>Are you sure?</DialogTitle>
      <DialogContent>
        <Typography color='secondary'>
          Going back will reset your votes. Do you want to submit your votes so
          far? If you submit your votes, you will not be able to change them
          later.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
          }}
        >
          <MainButton onClick={() => handleBack('cancel')} text='Cancel' />
          <MainButton onClick={() => handleBack('leave')} text='Just Leave' />
        </Box>
        <MainButton
          onClick={() => handleBack('submit')}
          text='Leave and submit'
        />
      </DialogActions>
    </Dialog>
  )
}

export default BackDialog
