import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        height: '35vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          width: { xs: '95%', sm: '100%' },
          maxWidth: { xs: '100%', sm: '90%', lg: '1100px' },
          gap: '30px',
        }}
      >
        <Box
          sx={{
            alignSelf: 'flex-start',
          }}
        >
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
            width: { xs: '100%', sm: '200px' },
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            justifyContent: 'space-between',
          }}
        >
          <Link to='/party/about'>
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
