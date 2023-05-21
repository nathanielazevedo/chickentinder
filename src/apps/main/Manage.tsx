import API from '../../api';
import Results from './Results';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const Manage = () => {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = useState<Party>();
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      try {
        const party = await API.getParty(id);
        if (party.r_winner) setWinner(true);
        setParty(party);
      } catch (err) {
        console.log(err);
      }
    };
    getParty();
  }, [id]);

  const endParty = async () => {
    try {
      if (!id || !party) return;
      await API.endParty(id);
      setWinner(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (winner) return <Results />;

  return (
    <>
      {party && (
        <>
          <Typography variant='h3'>{party.name}</Typography>
          <Typography variant='h6' mb='15px' color='secondary'>
            {party.voters_so_far} / {party.max_voters} voters have voted
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
