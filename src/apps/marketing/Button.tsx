import { Button as MuiButton, Typography } from '@mui/material'
import { useAppDispatch } from '../../state/redux'
import { setSwipeDirection } from '../../state'

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  const dispatch = useAppDispatch()
  return (
    <MuiButton
      fullWidth
      variant='contained'
      sx={{
        height: '50px',
        backgroundColor: 'rgb(0, 213, 250, 15%)',
        '&:hover': {
          backgroundColor: 'rgb(0, 213, 250, 25%)',
        },
      }}
      onClick={() => {
        dispatch(setSwipeDirection('left'))
        onClick && onClick()
      }}
    >
      <Typography color='primary' variant='h5'>
        {text}
      </Typography>
    </MuiButton>
  )
}

export default Button
