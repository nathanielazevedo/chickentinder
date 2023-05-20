import { bg } from '../../assets';
import Navbar from '../marketing/Navbar';
import { Box, CircularProgress } from '@mui/material';

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
          <CircularProgress
            size={100}
            sx={{
              color: 'white',
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateLoad;
