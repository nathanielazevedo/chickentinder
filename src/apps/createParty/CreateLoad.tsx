import { Box, Typography } from '@mui/material';
import React from 'react';
import { chick } from '../../assets';
import Navbar from '../../components/NavBar';

const CreateLoad = () => {
  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          height: 'calc(100vh - 70px)',
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
          <img src={chick} width='250px' />
          <Typography variant='h5'>
            I'm looking for the best restaurants for you...
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CreateLoad;
