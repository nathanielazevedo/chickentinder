import { useState } from 'react';
import VoteIcons from './VoteIcons';
import { Swipe } from './SwipeUtils';
import RCard from '../../../components/RCard';
import { Box, Typography } from '@mui/material';
import { Restaurant } from '../../../models/Restaurant';

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
      <RCard restaurant={restaurant} swipe={swipe} />
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
