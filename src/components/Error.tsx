import Container from './Container';
import MainButton from './MainButton';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const FourOFour = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          width: '100%',
        }}
      >
        <Typography variant='h1'>Yikes</Typography>
        <Typography variant='h5' mt='20px'>
          Chicken Tinder had a problem.
        </Typography>
        <Typography variant='h5'>We apologize.</Typography>
      </Box>
      <MainButton text='Go Home' onClick={() => navigate('/')} />
    </Container>
  );
};

export default FourOFour;
