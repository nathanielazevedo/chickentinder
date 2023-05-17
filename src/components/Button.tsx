import { Button as MuiButton, Typography } from '@mui/material';
import { globalStyles } from '../styles';

const Button = ({ text }: { text: string }) => {
  return (
    <MuiButton
      variant='contained'
      sx={{
        width: '100%',
        height: '50px',
        backgroundImage: globalStyles.gradientBg,
      }}
    >
      <Typography variant='h5' fontWeight='bold'>
        {text}
      </Typography>
    </MuiButton>
  );
};

export default Button;
