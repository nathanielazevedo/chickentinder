import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        height: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100vw',
        backgroundColor: 'black',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: { xs: '90%', sm: '100%' },
          maxWidth: { xs: '100%', sm: '90%', lg: '1100px' },
        }}
      >
        <Box>
          <Typography variant='h4' letterSpacing='.3rem' fontWeight='300'>
            CHICKEN TINDER
          </Typography>
          <Typography fontWeight='300'>Copyright @2023</Typography>
          <Typography fontWeight='300'>All Rights Reserved</Typography>
          <Typography fontWeight='300'>
            contactchickentinder@gmail.com
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: '100px', sm: '200px' },
          }}
        >
          <Link to='/'>
            <Typography>About</Typography>
          </Link>
          <Link to='/party/contact'>
            <Typography>Contact</Typography>
          </Link>
          <Link to='/terms'>
            <Typography>Terms</Typography>
          </Link>
          <Link to='/disclaimer'>
            <Typography>Disclaimer</Typography>
          </Link>
          <Link to='/privacy-policy'>
            <Typography>Privacy Policy</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
