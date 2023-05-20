import BackIcon from './BackIcon';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Container = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,0,0)',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '500px' },
          padding: { xs: '80px 20px', sm: '40px' },
          borderRadius: { xs: '0px', sm: '20px' },
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'auto' },
          maxHeight: { xs: '100%', sm: 'auto' },
          overflow: { xs: 'hidden', sm: 'auto' },
        }}
      >
        <BackIcon />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Container;
