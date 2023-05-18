import { Box } from '@mui/material';
import TwoStack from '../../components/TwoStack';
import { chick_dark } from '../../assets';

const GetStarted = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <Box display={{ xs: 'none', lg: 'flex' }}>
          <img src={chick_dark} width='200px' />
        </Box>
        <TwoStack
          variant='body'
          title='Get Started Now'
          body="Chicken Tinder is easy to use and doesn't require an account. Just
            generate a new link and share it with your friends."
        />
      </Box>
    </Box>
  );
};

export default GetStarted;

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '70px 0',
    border: '12px solid black',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-evenly', lg: 'space-evenly' },
    alignItems: 'center',
    width: { xs: '100%', sm: '90%', md: '90%', lg: '1100px' },
  },
};
