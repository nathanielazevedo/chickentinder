import { Box, Card } from '@mui/material';
import { bg } from '../assets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({ children }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: '100%', sm: '100%' },
        minHeight: {
          xs: 'calc(100vh - 56px)',
          sm: 'calc(100vh - 64px)',
        },
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        paddingBottom: { xs: '50px', sm: '50px' },
      }}
    >
      <Card
        sx={{
          padding: '40px',
          borderRadius: '20px',
          width: { xs: '100%', sm: '500px' },
          backgroundColor: 'white',
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default Container;
