import MainButton from './MainButton';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const FourOFour = () => {
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          width: '300px',
        }}
      >
        <Typography variant='h1'>404</Typography>
        <Typography variant='h5'>You're lost!</Typography>
        <MainButton text='Go Home' onClick={() => navigate('/')} />
      </Box>
    </Box>
  );
};

export default FourOFour;
