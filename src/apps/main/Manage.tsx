import API from '../../api';
import Results from './Results';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Restaurant } from '../../models/Restaurant';

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
    return <Results />;
  }

  return (
    <>
      {party && (
        <>
          <Typography variant='h3'>{party.name}</Typography>
          <Typography variant='h6' mb='15px' color='secondary'>
            {party.voters} / {party.maxVoters} voters have voted
          </Typography>
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
    </>
  );
};

export default Manage;
