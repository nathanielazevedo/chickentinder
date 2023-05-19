import API from '../../api';
import React, { useEffect } from 'react';
import { Party } from '../../models/Party';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../models/Restaurant';
import { Box, Card, Rating, Typography } from '@mui/material';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; realValue: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} color='error' />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant='body2'
          color='text.secondary'
        >{`${props.realValue}`}</Typography>
      </Box>
    </Box>
  );
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = React.useState<Party | undefined>(undefined);
  const [result, setResult] = React.useState<Restaurant | undefined>(undefined);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const data = await API.getParty(id);
        if (data.winner) setResult(data.winner);

        data.restaurants.forEach((restaurant: Restaurant) => {
          if (data.votes[restaurant.id]) {
            restaurant.votes = data.votes[restaurant.id];
          } else {
            restaurant.votes = 0;
          }
        });
        data.restaurants.sort((a: Restaurant, b: Restaurant) => {
          return b.votes - a.votes;
        });
        setParty(data);
      } catch {
        console.log('error');
      }
    };
    getParty();
  }, [id]);

  if (result) {
    return (
      <>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            color: 'black',
            alignSelf: 'flex-start',
          }}
        >
          And the winner is...
        </Typography>
        <Card
          elevation={3}
          key={result.id}
          sx={{
            ...styles.restaurantContainer,
            position: 'relative',
            padding: '20px',
            minHeight: '300px',
          }}
        >
          <img
            src={result.image_url}
            alt={result.name}
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
                {result.name}
              </Typography>
              <Typography variant='h6' color='white'>
                {result.location?.address1}, {result.location?.city}
              </Typography>
              {result.price && (
                <Typography variant='h6' color='white'>
                  Price: {result.price}
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
                  value={result.rating}
                  disabled
                />
                <Typography variant='h6' color='white'>
                  - {result.review_count} reviews
                </Typography>
              </Box>

              <Typography variant='h6' color='white'>
                {result.display_phone}
              </Typography>
              <a href={result.url} target='_blank'>
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
              {result.categories.map((category) => {
                return (
                  <Typography key={category.alias} variant='h6' color='white'>
                    #{category.title}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Card>
      </>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {party && party.restaurants && (
        <Typography
          variant='h5'
          sx={{
            color: 'black',
            marginTop: '0px',
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
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography sx={{ color: 'black' }}>{restaurant.name}</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel
                  value={Math.round((100 / party.maxVoters) * restaurant.votes)}
                  realValue={restaurant.votes}
                />
              </Box>
            </Box>
          );
        })}
      {party && party.voteTime && (
        <Typography
          variant='h5'
          sx={{
            color: 'black',
            marginTop: '20px',
            alignSelf: 'flex-start',
            marginBottom: '10px',
          }}
        >
          Times
        </Typography>
      )}
      {party &&
        party.voteTime &&
        Object.keys(party.hours).map((time) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography sx={{ color: 'black' }}>{time}</Typography>
              <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel
                  value={Math.round(
                    (100 / party.maxVoters) * party.hours[time]
                  )}
                  realValue={party.hours[time]}
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'flex-start', md: 'center' },
    paddingTop: { xs: '40px', md: '0px' },
    alignItems: 'center',
    maxHeight: '93vh',
    height: '93vh',
    width: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',

    // backgroundImage: `url(${food})`,
  },
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
