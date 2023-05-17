import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { globalStyles } from '../../styles';

const SectionFour = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box
          sx={{
            maxWidth: '550px',
            alignSelf: { xs: 'flex-start', lg: 'center' },
          }}
        >
          <Typography
            variant='h3'
            color={'white'}
            sx={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
            Make Decisions Faster
          </Typography>
          <Typography color='white'>
            Making decisions has never been easier. With Chicken Tinder, you can
            quickly and easily decide where to eat with your friends. No more
            arguing over text.
          </Typography>
          <Link to='create'>
            <Button
              variant='contained'
              onClick={() => setOpen(true)}
              sx={styles.button}
            >
              Create a Party
            </Button>
          </Link>
        </Box>

        <Box>
          <CheckCircleOutlineIcon sx={{ fontSize: '300px', color: 'white' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SectionFour;

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
    flexDirection: { xs: 'column-reverse', lg: 'row' },
    maxWidth: { xs: '90%', lg: '1200px' },
    width: { xs: '90%', lg: '1200px' },
    gap: { xs: '100px' },
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '50px',
    fontSize: '1rem',
    marginTop: '20px',
    backgroundImage: globalStyles.gradientBg,
  },
};
