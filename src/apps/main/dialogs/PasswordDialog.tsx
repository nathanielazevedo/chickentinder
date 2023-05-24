import React from 'react'
import API from '../../../api'
import { useState } from 'react'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useNavigate, useParams } from 'react-router-dom'
import { TransitionProps } from '@mui/material/transitions'

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

export default function FormDialog({ open, setOpen }: Props) {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [password, setPassword] = useState('')

  const checkPassword = async () => {
    if (!id) return
    const response = await API.validatePassword(id, password)
    if (response) {
      setOpen(false)
      navigate('/party/' + id + '/manage')
    } else setError(true)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: '20px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          error={error}
          margin='dense'
          label='Password'
          value={password}
          variant='outlined'
          helperText={error && 'Incorrect password'}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={() => setOpen(false)}>Close</Button>
        <Button onClick={checkPassword}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
