import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      display='flex'
      height='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
