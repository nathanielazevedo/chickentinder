import { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import playSound from '../../utils/playSound'
import { Restaurant } from '../../models/Restaurant'
import MainButton from '../../components/MainButton'
import { Box, Card, Link, Typography } from '@mui/material'

type RestaurantsPreviewProps = {
  restaurants: Restaurant[]
  createParty: () => void
  setRestaurants: (restaurants: Restaurant[] | undefined) => void
}

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
        }
      }
      return restaurant
    })
    setRestaurants(newRestaurants)
  }

  const getCheckedRestaurants = () => {
    const checked = restaurants.filter((restaurant) => restaurant.checked)
    return checked.length
  }

  useEffect(() => {
    playSound('win')
  }, [])

  return (
    <>
      <Typography variant='h5'>These are the restaurants I found.</Typography>
      <Typography variant='body1'>Uncheck the ones you don't like.</Typography>
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
              <Link href={restaurant.url} target='_blank'>
                View on Yelp
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          right: '10px',
        }}
      >
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
    </>
  )
}

export default RestaurantsPreview
