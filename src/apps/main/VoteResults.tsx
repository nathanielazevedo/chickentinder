import { bg } from '../../assets';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import NavBar from '../../components/Navbar';
import { Restaurant } from '../../models/Restaurant';
import { Box, Typography, Card, Rating } from '@mui/material';

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
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: { xs: '100%', sm: '100%' },
          minHeight: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)',
          },
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          paddingBottom: { xs: '50px', sm: '50px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            padding: '20px',
            borderRadius: '20px',
            overflowX: 'hidden',
            width: { xs: '50%', lg: '600px' },
            marginTop: '50px',
          }}
        >
          <Typography variant='h4' color='white'>
            You liked these restaurants!
          </Typography>
          {/* <Button
            variant='contained'
            sx={{
              width: '100%',
              height: '50px',
              fontSize: '1rem',
            }}
            onClick={() => navigate(`/party/${id}`)}
          >
            Go to Main
          </Button> */}
        </Box>
        {rlikes.length != 0 && restaurants && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {restaurants.map((restaurant) => {
              if (!rlikes.includes(restaurant.id)) return null;
              return (
                <Card
                  elevation={3}
                  key={restaurant.id}
                  sx={{
                    ...styles.restaurantContainer,
                    position: 'relative',
                    padding: '20px',
                    minHeight: '300px',
                  }}
                >
                  <img
                    src={restaurant.image_url}
                    alt={restaurant.name}
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
                        {restaurant.name}
                      </Typography>
                      <Typography variant='h6' color='white'>
                        {restaurant.location?.address1},{' '}
                        {restaurant.location?.city}
                      </Typography>
                      {restaurant.price && (
                        <Typography variant='h6' color='white'>
                          Price: {restaurant.price}
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
                          value={restaurant.rating}
                          disabled
                        />
                        <Typography variant='h6' color='white'>
                          - {restaurant.review_count} reviews
                        </Typography>
                      </Box>

                      <Typography variant='h6' color='white'>
                        {restaurant.display_phone}
                      </Typography>
                      <a href={restaurant.url} target='_blank'>
                        <Typography sx={styles.link} variant='h6'>
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
                      {restaurant.categories.map((category) => {
                        return (
                          <Typography
                            key={category.alias}
                            variant='h6'
                            color='white'
                          >
                            #{category.title}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                </Card>
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
                    ...styles.restaurantContainer,
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
      </Box>
    </>
  );
};

export default VoteResults;

const styles = {
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100px',
    width: { xs: '350px', md: '500px' },
    borderRadius: '10px',
    backgroundColor: 'black',
  },
  link: {
    textDecoration: 'underline',
    color: 'lightblue',
  },
};
