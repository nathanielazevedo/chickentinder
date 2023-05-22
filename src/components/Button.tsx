import { Button as MuiButton, Typography } from '@mui/material'

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
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
      onClick={onClick && onClick}
    >
      <Typography color='primary' variant='h5'>
        {text}
      </Typography>
    </MuiButton>
  )
}

export default Button
