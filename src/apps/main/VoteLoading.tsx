import { Box, CircularProgress } from '@mui/material';

const VoteLoading = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box>
          <CircularProgress color='success' />
        </Box>
      </Box>
    </>
  );
};

export default VoteLoading;
