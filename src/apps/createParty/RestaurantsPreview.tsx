import Checkbox from '@mui/material/Checkbox'
import { Restaurant } from '../../models/Restaurant'
import MainButton from '../../components/MainButton'
import { Box, Link, Typography } from '@mui/material'
import BackIcon from '../../components/BackIcon'

type Props = {
  restaurants: Restaurant[]
  createParty: () => void
  setRestaurants: (restaurants: Restaurant[] | undefined) => void
}

const RestaurantsPreview = ({
  restaurants,
  createParty,
  setRestaurants,
}: Props) => {
  const handleCheck = (id: string) => {
    const newRestaurants = restaurants.map((restaurant) => {
      if (restaurant.id === id)
        return { ...restaurant, checked: !restaurant.checked }
      return restaurant
    })
    setRestaurants(newRestaurants)
  }

  const getCheckedRestaurants = () => {
    const checked = restaurants.filter((restaurant) => restaurant.checked)
    return checked.length
  }

  return (
    <>
      <BackIcon customAction={() => setRestaurants(undefined)} />
      <Typography variant='h5'>These are the restaurants I found.</Typography>
      <Typography variant='body1'>Uncheck the ones you don't like.</Typography>
      <Box mt='15px'>
        <MainButton
          disabled={getCheckedRestaurants() < 2}
          onClick={createParty}
          text={
            getCheckedRestaurants() < 2
              ? 'Must select at least 2'
              : 'Create the Party!'
          }
        />
      </Box>
      <Box m='25px 0'>
        {restaurants.map((restaurant: Restaurant) => (
          <Box
            key={restaurant.id}
            sx={{
              gap: '15px',
              display: 'flex',
              padding: '10px',
              margin: '10px 0',
              alignItems: 'center',
              borderRadius: '10px',
              border: '0.1px solid white',
            }}
          >
            <Checkbox
              checked={restaurant.checked}
              onChange={() => handleCheck(restaurant.id)}
            />
            <Box>
              <Typography>{restaurant.name}</Typography>
              <Link href={restaurant.url} target='_blank'>
                View on Yelp
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default RestaurantsPreview
