import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import BackIcon from '../../components/BackIcon';
import { Restaurant } from '../../models/Restaurant';
import { Box, Typography } from '@mui/material';

type Props = {
  party: Party;
  rlikes: string[];
  tLikes: string[];
};

const VoteResults = ({ party, rlikes, tLikes }: Props) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    const findLikedRestaurants = () => {
      const likedRestaurants = party.restaurants.filter((restaurant) =>
        rlikes.includes(restaurant.id)
      );
      setRestaurants(likedRestaurants);
    };
    findLikedRestaurants();
  }, [party.restaurants, rlikes]);

  return (
    <>
      <BackIcon />
      <Typography variant='h4' color='white' mb='20px'>
        Liked restaurants
      </Typography>
      {rlikes.length != 0 && restaurants && (
        <Box display='flex' flexDirection='column' gap='10px'>
          {restaurants.map((restaurant) => {
            if (!rlikes.includes(restaurant.id)) return null;
            return (
              <Box
                key={restaurant.id}
                sx={{
                  position: 'relative',
                  padding: '10px',
                  border: '0.1px solid white',
                  borderRadius: '10px',
                }}
              >
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
                    <Typography variant='h6' color='secondary'>
                      {restaurant.name}
                    </Typography>
                    <a href={restaurant.url} target='_blank'>
                      <Typography sx={styles.link} variant='h6'>
                        View on Yelp
                      </Typography>
                    </a>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      {tLikes && (
        <Box>
          <Typography variant='h4' color='white' mb='20px' mt='20px'>
            Liked times
          </Typography>
          {tLikes.map((time) => {
            return (
              <Box
                key={time}
                sx={{
                  padding: '10px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  border: '0.1px solid white',
                }}
              >
                <Typography variant='h6' color='secondary'>
                  {time}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default VoteResults;

const styles = {
  link: {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};
