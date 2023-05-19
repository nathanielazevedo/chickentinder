import { Box } from '@mui/material';
import TwoStack from '../../components/TwoStack';
// import CheckIcon from '@mui/icons-material/Check';
import { network } from '../../assets';

const Decisions = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <TwoStack
          variant='dark'
          title='Make Decisions Faster'
          body='Making decisions has never been easier. With Chicken Tinder, you can
            quickly and easily decide where to eat with your friends. No more
            arguing over text.'
        />
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <img src={network} width='200px' />
        </Box>
      </Box>
    </Box>
  );
};

export default Decisions;

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: { xs: '70px 0', lg: '100px 0' },
    backgroundColor: 'black',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: { xs: 'row', lg: 'row' },
    maxWidth: { xs: '90%', lg: '1200px' },
    width: { xs: '90%', lg: '1200px' },
    gap: { xs: '100px' },
    justifyContent: 'center',
    alignItems: 'center',
  },
};
