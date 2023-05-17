import { Box, Typography } from '@mui/material';

const TwoStack = ({
  title,
  body,
  variant,
}: {
  title: string;
  body: string;
  variant: string;
}) => {
  if (variant === 'hero') {
    return (
      <Box>
        <Typography variant='h1' fontWeight='bold' mb={1.5} color='white'>
          {title}
        </Typography>
        <Typography mb={3} variant='h5' color='white'>
          {body}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: { xs: '90%', md: '55%' } }}>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb={1}
          color={variant == 'dark' ? 'white' : 'black'}
        >
          {title}
        </Typography>
        <Typography color={variant == 'dark' ? 'white' : 'black'}>
          {body}
        </Typography>
      </Box>
    );
  }
};

export default TwoStack;
