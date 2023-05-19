import { bg } from '../assets';
import { Box, Button, Typography } from '@mui/material';
import Navbar from './Navbar';
import { globalStyles } from '../styles';
import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          height: { xs: '100%', sm: '100%' },
          minHeight: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)',
          },
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: { xs: '100px', sm: 0 },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: '5rem',
            }}
          >
            404
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: '2rem',
            }}
          >
            You're lost!
          </Typography>
          <Button
            variant='contained'
            fullWidth
            sx={{
              height: '40px',
              color: 'black',
              backgroundImage: globalStyles.gradientBg,
              border: '1px solid black',
              marginTop: '30px',
            }}
            onClick={() => navigate('/')}
          >
            <Typography variant='h6'>Go Home</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FourOFour;
