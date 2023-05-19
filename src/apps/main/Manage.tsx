import Results from './Results';
import API from '../../api';
import { bg } from '../../assets';
import ResultsPage from './ResultsPage';
import { Party } from '../../models/Party';
import { globalStyles } from '../../styles';
import { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import { Restaurant } from '../../models/Restaurant';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const Manage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [result, setResult] = useState<Restaurant | undefined>(undefined);

  useEffect(() => {
    try {
      if (!id) return;
      API.getParty(id).then((res) => {
        if (res.winner) setResult(res.winner);
        setParty(res);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const endParty = async () => {
    try {
      if (!id || !party) return;
      const res = await API.endParty(id);
      const result = party.restaurants.find((r) => r.id === res);
      setResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  if (result) {
    return <ResultsPage />;
  }

  return (
    <>
      <NavBar />
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
        {party && (
          <Box
            sx={{
              padding: '40px',
              borderRadius: '20px',
              width: { xs: '90%', sm: '500px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: '20px',
              backgroundColor: '#ffffff',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {party.name}
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {party.voters} / {party.maxVoters} voters have voted
              </Typography>
            </Box>
            <Results />
            <Button
              fullWidth
              variant='contained'
              sx={{
                heigth: '50px',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
              color='error'
              onClick={endParty}
            >
              End voting
            </Button>
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
              Go Back
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Manage;
