import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import TwoStack from '../../components/TwoStack';

const GetStarted = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Box sx={styles.innerContainer}>
        <TwoStack
          variant='body'
          title='Get Started Now'
          body="Chicken Tinder is easy to use and doesn't require an account. Just
            generate a new link and share it with your friends."
        />
        <Box>
          <Link
            to='/create'
            style={{
              width: '100%',
            }}
          >
            <Button text='Create a Party' />
          </Link>
        </Box>
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
    borderRadius: '10px',
    backgroundColor: 'white',
    maxWidth: '100vw',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', lg: 'row' },
    alignItems: 'center',
    maxWidth: { xs: '100%', sm: '90%', md: '1100px' },
    width: { xs: '100%', sm: '100%' },
  },
};
