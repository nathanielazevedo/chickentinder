import { globalStyles } from '../styles';
import { Button, Typography } from '@mui/material';

type Props = {
  text: string;
  onClick: () => void;
};

const MainButton = ({ text, onClick }: Props) => {
  return (
    <Button
      fullWidth
      onClick={onClick}
      variant='contained'
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
