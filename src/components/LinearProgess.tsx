import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

function LinearProgess(
  props: LinearProgressProps & { value: number; realValue: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant='body2'
          color='text.secondary'
        >{`${props.realValue}`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgess;
