import Dialog from '@mui/material/Dialog'
import { Button, DialogActions, Slide, Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

const NewPartyDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          padding: '20px',
          backgroundImage: 'none',
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
        <Button onClick={() => setOpen(false)} color='primary'>
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewPartyDialog
