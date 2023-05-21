import { Box, Typography } from '@mui/material'
import { logo_p_trans } from '../../assets'

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
          <Typography variant='h4' letterSpacing='.3rem'>
            CHICKEN TINDER
          </Typography>
          <Typography>Copyright @2023</Typography>
          <Typography>All Rights Reserved</Typography>
        </Box>
        <Box
          sx={{
            width: { xs: '100px', sm: '200px' },
          }}
        >
          <img src={logo_p_trans} alt='logo' style={{ width: '100%' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
