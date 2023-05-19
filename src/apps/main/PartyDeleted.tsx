import NavBar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '../../components/Container';
import MainButton from '../../components/MainButton';

const PartyDeleted = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar showButton={false} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '3rem',
            }}
          >
            Sorry!
          </Typography>
          <Typography variant='h5'>This party has been removed.</Typography>
        </Box>
        <MainButton text='Go Home' onClick={() => navigate('/my-parties')} />
      </Container>
    </>
  );
};

export default PartyDeleted;
