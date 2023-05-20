import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Restaurant } from '../../../models/Restaurant';
import { Box, Rating, Typography } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

type Swipe = {
  id: string;
  direction: string;
};

type Props = {
  restaurants: Restaurant[];
  fRV: (likes: string[]) => void;
};

const left = 'cssanimation sequence fadeOutLeft';
const right = 'cssanimation sequence fadeOutRight';

const VoteRestaurant = ({ restaurants, fRV }: Props) => {
  const [swipe, setSwipe] = useState<Swipe | undefined>(undefined);
  const [buttonsActive, setButtonsActive] = useState<boolean>(true);
  const [likes, setLikes] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const length = restaurants.length;

  const getSwipe = (id: string) => {
    if (swipe?.id === id) {
      if (swipe.direction === 'left') return left;
      else return right;
    } else return '';
  };

  if (index === length) {
    fRV(likes);
    return <></>;
  }

  const restaurant = restaurants[index];

  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <Typography variant='h5' alignSelf='flex-end' mb='5px'>
        {index + 1} of {length}
      </Typography>
      <Box
        key={restaurant.id}
        className={getSwipe(restaurant?.id)}
        sx={{
          ...styles.restaurantContainer,
          position: 'relative',
          display: 'flex',
          padding: '20px',
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
              {restaurant.location?.address1}, {restaurant.location?.city}
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
            {restaurant.categories.map((category, index) => {
              return (
                <Typography variant='h6' color='white' key={index}>
                  #{category.title}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '30%',
          marginTop: '40px',
          gap: '40px',
        }}
      >
        <ThumbDownIcon
          sx={{
            fontSize: '50px',
            cursor: 'pointer',
          }}
          color='error'
          onClick={() => {
            if (!buttonsActive) return;
            setButtonsActive(false);
            setSwipe({ id: restaurant.id, direction: 'left' });
            setTimeout(() => {
              setIndex((prevState) => prevState + 1);
              setButtonsActive(true);
            }, 1000);
          }}
        />
        {index !== 0 ? (
          <SettingsBackupRestoreIcon
            sx={{
              fontSize: '50px',
              cursor: 'pointer',
            }}
            color='warning'
            onClick={() => {
              if (!buttonsActive) return;
              setButtonsActive(false);
              setSwipe({ id: '123', direction: 'left' });
              setLikes((prevState) => {
                // remove this restaurant it it was liked
                const newLikes = prevState.filter((id) => {
                  return id != restaurants[index - 1].id;
                });
                return [...newLikes];
              });
              setIndex((prevState) => prevState - 1);
              setButtonsActive(true);
            }}
          />
        ) : (
          <Box width='50px' />
        )}
        <ThumbUpIcon
          sx={{
            fontSize: '50px',
            cursor: 'pointer',
          }}
          color='success'
          onClick={() => {
            if (!buttonsActive) return;
            setButtonsActive(false);
            setLikes((prevState) => [...prevState, restaurant.id]);
            setSwipe({ id: restaurant.id, direction: 'right' });
            setTimeout(() => {
              setIndex((prevState) => prevState + 1);
              setButtonsActive(true);
            }, 1000);
          }}
        />
      </Box>
    </Box>
  );
};

export default VoteRestaurant;

const styles = {
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '400px',
    width: { xs: '370px', md: '500px' },
    backgroundColor: 'black',
  },
  link: {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};
