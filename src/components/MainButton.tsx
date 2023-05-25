import { Box, Button, Typography } from '@mui/material'
import { useAppDispatch } from '../state/redux'
import { setSwipeDirection } from '../state'

type Props = {
  text: string
  onClick?: () => void
  disabled?: boolean | undefined
  icon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  height?: string
}

const MainButton = ({
  text,
  onClick,
  disabled = false,
  icon,
  type,
  height,
}: Props) => {
  const dispatch = useAppDispatch()
  return (
    <Button
      fullWidth
      type={type ?? 'button'}
      onClick={() => {
        dispatch(setSwipeDirection('left'))
        onClick && onClick()
      }}
      variant='outlined'
      disabled={disabled}
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: height ?? '50px',
        border: 'none',
        backgroundColor: 'rgb(0, 213, 250, 15%)',
        '&:hover': {
          backgroundColor: 'rgb(0, 213, 250, 25%)',
          border: 'none',
        },
        '&:disabled': {
          border: 'none',
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
