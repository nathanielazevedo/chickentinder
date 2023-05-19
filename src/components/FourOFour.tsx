import Navbar from './Navbar';
import Container from './Container';
import MainButton from './MainButton';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar showButton={false} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '5rem',
            }}
          >
            404
          </Typography>
          <Typography variant='h5'>You're lost!</Typography>
        </Box>
        <MainButton text='Go Home' onClick={() => navigate('/')} />
      </Container>
    </>
  );
};

export default FourOFour;
