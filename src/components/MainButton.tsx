import { globalStyles } from '../styles';
import { Button, Typography } from '@mui/material';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const MainButton = ({ text, onClick, disabled = false }: Props) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant='contained'
      disabled={disabled}
      sx={{
        height: '40px',
        color: 'black',
        border: '1px solid black',
        backgroundImage: globalStyles.gradientBg,
      }}
    >
      <Typography variant='h6'>{text}</Typography>
    </Button>
  );
};

export default MainButton;
