import { Box } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({ children }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: {
          xs: 'calc(100vh - 56px)',
          sm: 'calc(100vh - 64px)',
        },
        backgroundColor: 'rgb(0,0,0)',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '500px' },
          padding: { xs: '80px 20px', sm: '40px' },
          borderRadius: { xs: '0px', sm: '20px' },
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'auto' },
          maxHeight: { xs: '50%', sm: 'auto' },
          overflow: { xs: 'hidden', sm: 'auto' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Container;
