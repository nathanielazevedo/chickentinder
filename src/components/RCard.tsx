import { Restaurant } from '../models/Restaurant'
import { Box, Typography } from '@mui/material'
import { Swipe, getSwipe } from '../apps/main/vote/SwipeUtils'
import { getStarsImage } from '../utils/general'
import { yelp_logo } from '../assets/yelp'

type Props = {
  restaurant: Restaurant
  swipe: Swipe
}

const RCard = ({ restaurant, swipe }: Props) => {
  return (
    <Box className={getSwipe(restaurant?.id, swipe)} sx={styles.c}>
      <img
        alt={restaurant.name}
        src={restaurant.image_url}
        style={{
          right: 0,
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '10px',
          position: 'absolute',
          filter: 'brightness(35%)',
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
          <Box m='5px 0' gap='10px' display='flex'>
            <img src={getStarsImage(restaurant.rating)} width='100px' />
            <img alt='yelp logo' width='50px' src={yelp_logo} />
          </Box>
          <Typography>Based on {restaurant.review_count} Reviews</Typography>

          <Typography>{restaurant.display_phone}</Typography>
          <a href={restaurant.url} target='_blank'>
            <Typography sx={styles.link}>View on Yelp</Typography>
          </a>
        </Box>
        <Box display='flex' gap='10px' justifySelf='flex-end' flexWrap='wrap'>
          {restaurant.categories.map((category, i) => (
            <Typography key={i}>#{category.title}</Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default RCard

const styles = {
  c: {
    padding: '20px',
    height: '350px',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'flex-start',
    width: { xs: '400px', md: '500px' },
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
}
