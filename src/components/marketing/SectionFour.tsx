import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

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
            sx={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
            Make Decisions Faster
          </Typography>
          <Typography>
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
          <CheckCircleOutlineIcon
            color='success'
            sx={{ fontSize: '300px', color: '#a82720' }}
          />
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
    padding: '150px 0',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: { xs: 'column-reverse', lg: 'row' },
    maxWidth: { xs: '90%', lg: '1200px' },
    width: { xs: '90%', lg: '1200px' },
    gap: { xs: '150px' },
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '50px',
    fontSize: '1rem',
    marginTop: '20px',
  },
};
