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
        paddingBottom: { xs: '0px', sm: '50px' },
      }}
    >
      <Card
        sx={{
          backgroundColor: 'white',
          width: { xs: '100%', sm: '500px' },
          padding: { xs: '40px 20px', sm: '40px' },
          borderRadius: { xs: '0px', sm: '20px' },
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'auto' },
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default Container;
