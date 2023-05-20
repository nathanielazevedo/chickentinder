import Results from './Results';
import API from '../../api';
import ResultsPage from './ResultsPage';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { Restaurant } from '../../models/Restaurant';
import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import BackIcon from '../../components/BackIcon';

const Manage = () => {
  const { id } = useParams<{ id: string }>();
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
      <BackIcon />
      <Container>
        {party && (
          <>
            <Box
              mb='30px'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant='h3'>{party.name}</Typography>
              <Typography variant='h6'>
                {party.voters} / {party.maxVoters} voters have voted
              </Typography>
            </Box>
            <Results />
            <Button
              variant='outlined'
              sx={{
                fontSize: '12px',
                position: 'absolute',
                top: '20px',
                right: '10px',
              }}
              color='error'
              onClick={endParty}
            >
              End voting
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Manage;
