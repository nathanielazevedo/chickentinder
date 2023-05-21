import { Button as MuiButton, Typography } from '@mui/material'

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <MuiButton
      fullWidth
      variant='contained'
      sx={{ height: '50px' }}
      onClick={onClick && onClick}
    >
      <Typography variant='h5'>{text}</Typography>
    </MuiButton>
  )
}

export default Button
