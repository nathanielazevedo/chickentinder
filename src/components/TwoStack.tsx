import { Box, Typography } from '@mui/material';
import Button from './Button';
import { Link } from 'react-router-dom';

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
        <Link to='/create'>
          <Button text='Create a Party' />
        </Link>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: { xs: '90%', md: '50%' } }}>
        <Typography
          variant='h3'
          fontWeight='bold'
          mb={1}
          color={variant == 'dark' ? 'white' : 'black'}
        >
          {title}
        </Typography>
        <Typography color={variant == 'dark' ? 'white' : 'black'} mb={2}>
          {body}
        </Typography>
        <Link to='/create'>
          <Button text='Create a Party' />
        </Link>
      </Box>
    );
  }
};

export default TwoStack;
