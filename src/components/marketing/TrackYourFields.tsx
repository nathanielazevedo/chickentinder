import { Box, Button, Typography } from '@mui/material';
import iphone from '../../assets/iphone.png';
import { globalStyles } from '../../styles';
import { Link } from 'react-router-dom';

const SectionThree = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box>
          <img src={iphone} width='200px' />
        </Box>
        <Box sx={styles.wordContainer}>
          <Typography
            variant='h3'
            sx={{ fontWeight: 'bold', marginBottom: '5px' }}
          >
            Where are we eating?
          </Typography>
          <Typography>
            Stop trying to organize your friends over text. Use our app to
            quickly and easily decide where to eat. Blame Chicken Tinder if you
            don't like the restaurant.
          </Typography>
          <Link to='create'>
            <Button
              fullWidth
              sx={styles.button}
              variant='contained'
              onClick={() => setOpen(true)}
            >
              Create a Party
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionThree;

const styles = {
  container: {
    height: { xs: '100%', lg: '50vh' },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: { xs: '100px 0', lg: '0' },
    backgroundColor: 'white',
  },
  innerContainer: {
    color: 'black',
    display: 'flex',
    flexDirection: { xs: 'column-reverse', lg: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
    width: { xs: '90%', lg: '1200px' },
    maxWidth: { xs: '90%', lg: '900px' },
    gap: { xs: '70px', lg: '70px' },
  },
  wordContainer: {
    maxWidth: { xs: '550px', lg: '500px' },
    alignSelf: { xs: 'flex-start', lg: 'center' },
  },
  button: {
    marginTop: '30px',
    height: '50px',
    backgroundImage: globalStyles.gradientBg,
  },
};
