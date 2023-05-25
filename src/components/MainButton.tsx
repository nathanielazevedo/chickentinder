import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch } from '../state/redux'
import { setSwipeDirection } from '../state'

type Props = {
  text: string
  onClick?: () => void
  disabled?: boolean | undefined
  icon?: React.ReactNode
}

const MainButton = ({ text, onClick, disabled = false, icon }: Props) => {
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
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgb(0, 213, 250, 15%)',
        '&:hover': {
          backgroundColor: 'rgb(0, 213, 250, 25%)',
        },
      }}
    >
      <Typography>{text}</Typography>
      {icon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          {icon}
        </Box>
      )}
    </Button>
  )
}

export default MainButton
