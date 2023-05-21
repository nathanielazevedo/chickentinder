import API from '../../api';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addVotesTo } from '../../utils/general';
import { Restaurant } from '../../models/Restaurant';
import { Box, Rating, Typography } from '@mui/material';
import LinearProgess from '../../components/LinearProgess';
import CelebrationIcon from '@mui/icons-material/Celebration';

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = useState<Party>();
  const [rWinner, setRWinner] = useState<Restaurant>();
  const [tWinner, setTWinner] = useState<string>();

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
          <CelebrationIcon
            sx={{
              fontSize: '50px',
              color: 'darkpink',
            }}
          />
        </Box>
        <Box
          key={rWinner.id}
          sx={{
            ...styles.restaurantContainer,
            position: 'relative',
            padding: '20px',
            minHeight: '300px',
          }}
        >
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
              <Typography variant='h5' color='white'>
                {rWinner.name}
              </Typography>
              <Typography variant='h6' color='white'>
                {rWinner.location?.address1}, {rWinner.location?.city}
              </Typography>
              {rWinner.price && (
                <Typography variant='h6' color='white'>
                  Price: {rWinner.price}
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Rating
                  name='simple-controlled'
                  value={rWinner.rating}
                  disabled
                />
                <Typography variant='h6' color='white'>
                  - {rWinner.review_count} reviews
                </Typography>
              </Box>

              <Typography variant='h6' color='white'>
                {rWinner.display_phone}
              </Typography>
              <a href={rWinner.url} target='_blank'>
                <Typography sx={styles.link} variant='h6' color='white'>
                  View on Yelp
                </Typography>
              </a>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifySelf: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              {rWinner.categories.map((category) => {
                return (
                  <Typography key={category.alias} variant='h6' color='white'>
                    #{category.title}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Box>
        {tWinner && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20px',
            }}
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
        <Typography
          variant='h4'
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '10px',
          }}
        >
          Restaurants
        </Typography>
      )}
      {party &&
        party.restaurants.map((restaurant) => {
          return (
            <Box
              key={restaurant.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography color='secondary'>{restaurant.name}</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgess
                  value={Math.round(
                    (100 / party.max_voters) * restaurant.votes
                  )}
                  realValue={restaurant.votes}
                />
              </Box>
            </Box>
          );
        })}
      {party && party.vote_on_time && (
        <Typography
          variant='h4'
          sx={{
            marginTop: '20px',
            alignSelf: 'flex-start',
            marginBottom: '10px',
          }}
        >
          Times
        </Typography>
      )}
      {party &&
        party.vote_on_time &&
        party.times_to_vote_on.map((time) => {
          if (!time.votes) {
            time.votes = 0;
          }
          return (
            <Box
              key={time.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography color='secondary'>{time.id}</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgess
                  value={Math.round((100 / party.max_voters) * time.votes)}
                  realValue={time.votes}
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
  },
  link: {
    textDecoration: 'underline',
    color: 'lightblue',
  },
};
