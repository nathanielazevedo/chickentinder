import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

const LinearProgess = ({
  realValue,
  ...props
}: LinearProgressProps & { value: number; realValue?: number }) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' color='text.secondary'>
          {realValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default LinearProgess;
