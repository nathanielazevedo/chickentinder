import { Button as MuiButton, Typography } from '@mui/material';
import { globalStyles } from '../styles';

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <MuiButton
      onClick={onClick && onClick}
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
