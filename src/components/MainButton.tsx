import { Button, Typography } from '@mui/material'
import { useAppDispatch } from '../state/redux'
import { setSwipeDirection } from '../state'

type Props = {
  text: string
  onClick?: () => void
  disabled?: boolean | undefined
}

const MainButton = ({ text, onClick, disabled = false }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <Button
      fullWidth
      onClick={() => {
        dispatch(setSwipeDirection('left'))
        onClick && onClick()
      }}
      variant='outlined'
      disabled={disabled}
      sx={{
        height: '100%',

        backgroundColor: 'rgb(0, 213, 250, 15%)',
        '&:hover': {
          backgroundColor: 'rgb(0, 213, 250, 25%)',
        },
      }}
    >
      <Typography>{text}</Typography>
    </Button>
  )
}

export default MainButton
