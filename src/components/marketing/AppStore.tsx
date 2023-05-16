import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SectionOne = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <Box sx={{ width: { xs: '90%', md: '55%' } }}>
          <Typography variant='h4' fontWeight='bold' mb={1}>
            Get Started Now
          </Typography>
          <Typography>
            Chicken Tinder is easy to use and doesn't require an account. Just
            generate a new link and share it with your friends.
          </Typography>
        </Box>
        <Box sx={styles.imageContainer}>
          <Link
            to='/create'
            style={{
              width: '100%',
            }}
          >
            <Button
              variant='contained'
              fullWidth
              sx={{
                height: '50px',
                marginTop: '0px',
              }}
            >
              <Typography>Create a Party</Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionOne;

const styles = {
  container: {
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs: '90%', sm: '90%', md: '55%', lg: '30%' },
    paddingTop: { xs: '50px', lg: '0' },
  },
};
