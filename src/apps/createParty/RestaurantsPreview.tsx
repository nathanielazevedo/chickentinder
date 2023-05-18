import { Box, Card, Link, Typography } from '@mui/material';
import { chick } from '../../assets';
import Checkbox from '@mui/material/Checkbox';
import Navbar from '../../components/Navbar';
import { Restaurant } from '../../models/Restaurant';
import Button from '../../components/Button';

type RestaurantsPreviewProps = {
  restaurants: Restaurant[];
  moveAhead: () => void;
  setRestaurants: (restaurants: Restaurant[] | undefined) => void;
};

const RestaurantsPreview = ({
  restaurants,
  moveAhead,
  setRestaurants,
}: RestaurantsPreviewProps) => {
  const handleCheck = (id: string) => {
    const newRestaurants = restaurants.map((restaurant) => {
      if (restaurant.id === id) {
        return {
          ...restaurant,
          checked: !restaurant.checked,
        };
      }
      return restaurant;
    });
    setRestaurants(newRestaurants);
  };

  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            padding: '40px 0',
            borderRadius: '20px',
            width: { xs: '98%', sm: '500px' },
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img src={chick} width='50px' />
              <Box>
                <Typography variant='h5'>
                  These are the restaurants I found.
                </Typography>
                <Typography variant='body1'>
                  Uncheck the ones you don't like.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: '25px',
                marginBottom: '25px',
              }}
            >
              {restaurants.map((restaurant: Restaurant) => (
                <Card
                  key={restaurant.id}
                  sx={{
                    margin: '10px',
                    padding: '10px',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={restaurant.checked}
                    onChange={() => handleCheck(restaurant.id)}
                  />
                  <Box>
                    <Typography>{restaurant.name}</Typography>
                    <Typography>{restaurant.description}</Typography>
                    <Link href={restaurant.url} target='_blank'>
                      View on Yelp
                    </Link>
                  </Box>
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <Button text='Create the Party!' onClick={moveAhead} />
              <Button
                text='Go Back'
                onClick={() => setRestaurants(undefined)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RestaurantsPreview;
