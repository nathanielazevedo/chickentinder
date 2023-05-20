import Container from './Container';
import MainButton from './MainButton';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const FourOFour = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant='h1'>404</Typography>
          <Typography variant='h5'>You're lost!</Typography>
        </Box>
        <MainButton text='Go Home' onClick={() => navigate('/')} />
      </Container>
    </>
  );
};

export default FourOFour;
