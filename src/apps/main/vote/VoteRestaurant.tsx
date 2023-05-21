import { useState } from 'react';
import VoteIcons from './VoteIcons';
import { Swipe, getSwipe } from './SwipeUtils';
import { Restaurant } from '../../../models/Restaurant';
import { Box, Rating, Typography } from '@mui/material';

type Props = {
  restaurants: Restaurant[];
  fRV: (likes: string[]) => void;
};

const VoteRestaurant = ({ restaurants, fRV }: Props) => {
  const [swipe, setSwipe] = useState<Swipe>({ id: '', direction: '' });
  const [likes, setLikes] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const restaurant = restaurants[index];
  const length = restaurants.length;

  if (index === length) {
    fRV(likes);
    return <></>;
  }

  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <Typography variant='h5' alignSelf='flex-end' mb='5px'>
        {index + 1} of {length}
      </Typography>
      <Box className={getSwipe(restaurant?.id, swipe)} sx={styles.c}>
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
        <Box sx={styles.rContent}>
          <Box>
            <Typography variant='h5'>{restaurant.name}</Typography>
            <Typography>
              {restaurant.location?.address1}, {restaurant.location?.city}
            </Typography>
            {restaurant.price && (
              <Typography>Price: {restaurant.price}</Typography>
            )}
            <Box display='flex'>
              <Rating value={restaurant.rating} disabled />
              <Typography>/ {restaurant.review_count} reviews</Typography>
            </Box>
            <Typography>{restaurant.display_phone}</Typography>
            <a href={restaurant.url} target='_blank'>
              <Typography sx={styles.link}>View on Yelp</Typography>
            </a>
          </Box>
          <Box display='flex' gap='10px' justifySelf='flex-end' flexWrap='wrap'>
            {restaurant.categories.map((category, index) => (
              <Typography key={index}>#{category.title}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <VoteIcons
        index={index}
        item={restaurant}
        items={restaurants}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setLikes}
      />
    </Box>
  );
};

export default VoteRestaurant;

const styles = {
  c: {
    padding: '20px',
    height: '400px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'flex-start',
    width: { xs: '370px', md: '500px' },
  },
  rContent: {
    zIndex: 1,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'fle-start',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};
