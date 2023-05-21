import Dialog from '@mui/material/Dialog'
import { Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

const NewPartyDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Welcome to the party</DialogTitle>
      <DialogContent>
        <Typography>
          This is your party's page. Here you will be able to vote, view
          results, and manage your party. Share the link with your friends.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default NewPartyDialog
