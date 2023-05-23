import { Button, Typography } from '@mui/material'

type Props = {
  text: string
  onClick?: () => void
  disabled?: boolean | undefined
}

const MainButton = ({ text, onClick, disabled = false }: Props) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant='outlined'
      disabled={disabled}
      sx={{
        height: '100%',
        border: 'none',
        backgroundColor: 'rgb(0, 213, 250, 15%)',
        '&:hover': {
          backgroundColor: 'rgb(0, 213, 250, 25%)',
          border: 'none',
        },
      }}
    >
      <Typography>{text}</Typography>
    </Button>
  )
}

export default MainButton
