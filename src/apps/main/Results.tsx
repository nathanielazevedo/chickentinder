import API from '../../api';
import { Party } from '../../models/Party';
import RCard from '../../components/RCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Box, Typography } from '@mui/material';
import { addVotesTo } from '../../utils/general';
import { Restaurant } from '../../models/Restaurant';
import LinearProgess from '../../components/LinearProgess';

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = useState<Party>();
  const [tWinner, setTWinner] = useState<string>();
  const [rWinner, setRWinner] = useState<Restaurant>();

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const party = await API.getParty(id);
        if (party.r_winner) setRWinner(party.r_winner);
        if (party.t_winner) setTWinner(party.t_winner);
        addVotesTo(party.restaurants, party.r_votes);
        addVotesTo(party.times_to_vote_on, party.t_votes);
        setParty(party);
      } catch {
        console.log('error');
      }
    };
    getParty();
  }, [id]);

  if (!party) return <Loading />;

  if (rWinner) {
    return (
      <>
        <Typography variant='h4' color='secondary'>
          Winner
        </Typography>
        {tWinner && (
          <Typography color='secondary'>
            {rWinner.name} at {tWinner}
          </Typography>
        )}
        <RCard restaurant={rWinner} swipe={{ id: '', direction: '' }} />
      </>
    );
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      {party && (
        <Typography variant='h4' alignSelf='flex-start' mb='10px'>
          Restaurants
        </Typography>
      )}
      {party.restaurants.map((restaurant) => {
        return (
          <Box key={restaurant.id} sx={styles.rC}>
            <Typography color='secondary'>{restaurant.name}</Typography>
            <Box width='100%'>
              <LinearProgess
                realValue={restaurant.votes}
                value={Math.round((100 / party.max_voters) * restaurant.votes)}
              />
            </Box>
          </Box>
        );
      })}
      {party.vote_on_time && (
        <Typography variant='h4' mb='10px' mt='20px' alignSelf='flex-start'>
          Times
        </Typography>
      )}
      {party.vote_on_time &&
        party.times_to_vote_on.map((time) => {
          if (!time.votes) time.votes = 0;
          return (
            <Box key={time.id} sx={styles.rC}>
              <Typography color='secondary'>{time.id}</Typography>
              <Box width='100%'>
                <LinearProgess
                  realValue={time.votes}
                  value={Math.round((100 / party.max_voters) * time.votes)}
                />
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default Results;

const styles = {
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '400px',
    width: { xs: '100%', md: '500px' },
    borderRadius: '10px',
    backgroundColor: 'black',
    position: 'relative',
    padding: '20px',
    minHeight: '300px',
  },
  rC: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
};
