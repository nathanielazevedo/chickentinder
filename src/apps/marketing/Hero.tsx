import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo_no_word } from '../../assets';
import { bg } from '../../assets';
import Button from '../../components/Button';
import TwoStack from '../../components/TwoStack';

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
          <TwoStack
            title='Where are we eating?'
            body="Trying to organize a group dinner? Tired of the endless back and
              forth? Chicken Tinder helps your party decide where to eat and
              when. Swipe right on the restaurants you like and left on the ones
              you don't. Your votes are anonymous, so you can vote for your
              favorite restaurants without worrying about peer pressure.
          "
            variant='hero'
          />
          <Link to='/create'>
            <Button text='Create a Party' />
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
