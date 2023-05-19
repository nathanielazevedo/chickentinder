import Navbar from '../../components/Navbar';
import Checkbox from '@mui/material/Checkbox';
import Container from '../../components/Container';
import { Restaurant } from '../../models/Restaurant';
import MainButton from '../../components/MainButton';
import { Box, Card, Link, Typography } from '@mui/material';

type RestaurantsPreviewProps = {
  restaurants: Restaurant[];
  createParty: () => void;
  setRestaurants: (restaurants: Restaurant[] | undefined) => void;
};

const RestaurantsPreview = ({
  restaurants,
  createParty,
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

  const getCheckedRestaurants = () => {
    const checked = restaurants.filter((restaurant) => restaurant.checked);
    return checked.length;
  };

  return (
    <>
      <Navbar showButton={false} />
      <Container>
        <Typography variant='h5'>These are the restaurants I found.</Typography>
        <Typography variant='body1'>
          Uncheck the ones you don't like.
        </Typography>
        <Box m='25px 0'>
          {restaurants.map((restaurant: Restaurant) => (
            <Card
              key={restaurant.id}
              sx={{
                gap: '15px',
                display: 'flex',
                padding: '10px',
                margin: '10px 0',
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
        <Box display='flex' flexDirection='column' gap='10px'>
          <MainButton
            disabled={getCheckedRestaurants() < 2}
            onClick={createParty}
            text={
              getCheckedRestaurants() < 2
                ? 'Must select at least 2'
                : 'Create the Party!'
            }
          />
          <MainButton
            onClick={() => setRestaurants(undefined)}
            text='Go Back'
          />
        </Box>
      </Container>
    </>
  );
};

export default RestaurantsPreview;
