import { Box, Typography } from '@mui/material';
import { logo_no_word } from '../../assets';

const Footer = () => {
  return (
    <Box
      sx={{
        height: '40vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100vw',
        backgroundColor: 'black',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: { xs: '100%', sm: '90%', lg: '1100px' },
          width: { xs: '90%', sm: '100%' },
        }}
      >
        <Box>
          <Typography
            variant='h4'
            color='white'
            sx={{
              fontWeight: 400,

              letterSpacing: '.3rem',
            }}
          >
            Chicken Tinder
          </Typography>
          <Typography
            color='white'
            sx={{
              fontStyle: 'italic',
            }}
          >
            Copyright @2023
          </Typography>
          <Typography color='white'>All Rights Reserved</Typography>
        </Box>
        <Box
          sx={{
            width: { xs: '100px', sm: '200px' },
          }}
        >
          <img src={logo_no_word} alt='' style={{ width: '100%' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
