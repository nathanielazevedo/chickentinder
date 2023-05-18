import { bg } from '../../assets';
import { Box } from '@mui/material';
import { logo_c_trans } from '../../assets';
import TwoStack from '../../components/TwoStack';

const Hero = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <TwoStack
          variant='hero'
          title='Where are we eating?'
          body="Trying to organize a group dinner? Tired of the endless back and
              forth? Chicken Tinder helps your party decide where to eat and
              when. Swipe right on the restaurants you like and left on the ones
              you don't. Your votes are anonymous, so you can vote for your
              favorite restaurants without worrying about peer pressure."
        />
        <Box display={{ xs: 'none', lg: 'flex', paddingLeft: '100px' }}>
          <img src={logo_c_trans} width='350px' />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: { xs: '100%', sm: '90%', md: '1100px' },
    margin: { xs: '0 15px', sm: '0 40px', lg: '0' },
    justifyContent: { xs: 'center', lg: 'space-between' },
  },
};
