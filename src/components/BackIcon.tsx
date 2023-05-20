import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      sx={{
        borderRadius: '50%',
        minWidth: '50px',
        minHeight: '50px',
        position: 'absolute',
        top: '10px',
        left: '0px',
      }}
    >
      <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
    </Button>
  );
};

export default BackIcon;
