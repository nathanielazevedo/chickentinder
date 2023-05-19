import { Box, Button, Card, Typography } from '@mui/material';
import Results from './Results';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { bg } from '../../assets';
import { globalStyles } from '../../styles';

const ResultsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
        }}
      >
        <Card
          sx={{
            padding: { xs: '40px 15px', sm: '40px' },
            borderRadius: '20px',
            width: { xs: '90%', sm: '600px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant='h3'>Party Results</Typography>
          <Results />
          <Button
            variant='contained'
            fullWidth
            sx={{
              height: '40px',
              color: 'black',
              backgroundImage: globalStyles.gradientBg,
              border: '1px solid black',
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <Typography variant='h5'>Back to party</Typography>
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default ResultsPage;
