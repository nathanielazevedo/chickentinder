import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import BackIcon from '../../components/BackIcon';
import Container from '../../components/Container';
import { Restaurant } from '../../models/Restaurant';
import { Box, Typography, Card } from '@mui/material';

type Props = {
  id: string;
  party: Party;
  rlikes: string[];
  tLikes: { [key: string]: boolean };
};

const VoteResults = ({ rlikes, party, tLikes }: Props) => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | undefined>(
    undefined
  );

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
      <Container>
        <Typography variant='h4' color='white' mb='20px'>
          You liked these restaurants!
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
                      <Typography variant='h5'>{restaurant.name}</Typography>
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
              You liked these times!
            </Typography>
            {Object.keys(tLikes).map((time) => {
              return (
                <Card
                  elevation={3}
                  sx={{
                    display: 'flex',
                    padding: '20px',
                    border: '0.1px solid white',
                    marginBottom: '10px',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='h1' color='white'>
                      {time}
                    </Typography>
                  </Box>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
};

export default VoteResults;

const styles = {
  link: {
    textDecoration: 'underline',
    color: 'lightblue',
  },
};
