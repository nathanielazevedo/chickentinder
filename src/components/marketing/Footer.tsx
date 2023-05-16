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
            sx={{
              fontWeight: 400,
              fontSize: '1.7rem',
              letterSpacing: '.3rem',
            }}
          >
            Chicken Tinder
          </Typography>
          <Typography
            sx={{
              fontStyle: 'italic',
            }}
          >
            Copyright @2023
          </Typography>
          <Typography>All Rights Reserved</Typography>
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
