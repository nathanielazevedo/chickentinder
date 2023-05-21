import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Restaurant } from '../../models/Restaurant';

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
      <Typography variant='h4' mb='20px'>
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
                  padding: '10px',
                  borderRadius: '10px',
                  position: 'relative',
                  border: '0.1px solid white',
                }}
              >
                <Box
                  sx={{
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color='secondary'>{restaurant.name}</Typography>
                    <a href={restaurant.url} target='_blank'>
                      <Typography sx={styles.link}>View on Yelp</Typography>
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
          <Typography variant='h4' mb='20px' mt='20px'>
            Liked times
          </Typography>
          {tLikes.map((time) => (
            <Box
              p='10px'
              mb='10px'
              key={time}
              borderRadius='10px'
              border='0.1px solid white'
            >
              <Typography color='secondary'>{time}</Typography>
            </Box>
          ))}
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
