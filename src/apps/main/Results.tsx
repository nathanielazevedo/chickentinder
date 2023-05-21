import API from '../../api';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addVotesTo } from '../../utils/general';
import { Restaurant } from '../../models/Restaurant';
import { Box, Rating, Typography } from '@mui/material';
import LinearProgess from '../../components/LinearProgess';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Loading from '../../components/Loading';

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

  // If winner chosen
  // This should be a component
  if (rWinner) {
    return (
      <>
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          alignItems='center'
        >
          <Typography variant='h4'>And the winner is...</Typography>
          <CelebrationIcon sx={{ fontSize: '50px', color: 'darkpink' }} />
        </Box>
        <Box key={rWinner.id} sx={styles.restaurantContainer}>
          <img
            src={rWinner.image_url}
            alt={rWinner.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              position: 'absolute',
              filter: 'brightness(40%)',
              borderRadius: '10px',
              right: 0,
            }}
          />
          <Box
            sx={{
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography variant='h5'>{rWinner.name}</Typography>
              <Typography>
                {rWinner.location?.address1}, {rWinner.location?.city}
              </Typography>
              {rWinner.price && <Typography>Price: {rWinner.price}</Typography>}
              <Box display='flex' alignItems='center'>
                <Rating value={rWinner.rating} disabled />
                <Typography>- {rWinner.review_count} reviews</Typography>
              </Box>

              <Typography>{rWinner.display_phone}</Typography>
              <a href={rWinner.url} target='_blank'>
                <Typography sx={styles.link}>View on Yelp</Typography>
              </a>
            </Box>
            <Box
              gap='10px'
              display='flex'
              flexWrap='wrap'
              justifySelf='flex-end'
            >
              {rWinner.categories.map((category) => (
                <Typography key={category.alias}>#{category.title}</Typography>
              ))}
            </Box>
          </Box>
        </Box>
        {tWinner && (
          <Box
            mt='20px'
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Typography variant='h4'>And the time is...</Typography>
            <Typography variant='h5'>{tWinner}</Typography>
          </Box>
        )}
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
            <Box sx={{ width: '100%' }}>
              <LinearProgess
                value={Math.round((100 / party.max_voters) * restaurant.votes)}
                realValue={restaurant.votes}
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
              <Box sx={{ width: '100%' }}>
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
  link: {
    textDecoration: 'underline',
    color: 'lightblue',
  },
};
