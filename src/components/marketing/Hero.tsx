import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo_no_word } from '../../assets';
import { bg } from '../../assets';
import { globalStyles } from '../../styles';

const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        maxWidth: '100vw',
        backgroundColor: 'black',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'flex-start',
            sm: 'center',
            md: 'center',
            lg: 'space-between',
          },
          alignItems: 'center',
          maxWidth: { xs: '100%', sm: '90%', md: '1100px' },
          width: { xs: '100%', sm: '100%' },
          // gap: '150px',
        }}
      >
        <Box
          sx={{
            width: '600px',
            zIndex: 1,
            padding: { xs: '20px', sm: '30px 5px' },
            borderRadius: '10px',
          }}
        >
          <Box>
            <Typography
              variant='h1'
              sx={{ fontWeight: 'bold' }}
              mb={1.5}
              color='white'
            >
              Where are we eating?
            </Typography>
            <Typography mb={3} variant='h5' color='white'>
              Trying to organize a group dinner? Tired of the endless back and
              forth? Chicken Tinder helps your party decide where to eat and
              when. Swipe right on the restaurants you like and left on the ones
              you don't. Your votes are anonymous, so you can vote for your
              favorite restaurants without worrying about peer pressure.
            </Typography>
          </Box>
          <Link to='/create'>
            <Button
              variant='contained'
              sx={{
                width: '100%',
                height: '50px',
                backgroundImage: globalStyles.gradientBg,
              }}
            >
              <Typography variant='h5' fontWeight='bold'>
                Create a Party
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <img
            src={logo_no_word}
            alt=''
            style={{
              width: '350px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
