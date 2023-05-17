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
        <Typography
          variant='h1'
          sx={{ fontWeight: 'bold' }}
          mb={1.5}
          color='white'
        >
          {title}
        </Typography>
        <Typography mb={3} variant='h5' color='white'>
          {body}
        </Typography>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default TwoStack;
