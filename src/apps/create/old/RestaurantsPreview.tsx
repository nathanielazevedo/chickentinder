import { useState } from 'react'
import CustomDialog from './CustomDialog'
import Checkbox from '@mui/material/Checkbox'
import SlideIn from '../../../components/SlideIn'
import MainButton from '../../../components/MainButton'
import { Box, Link, Typography } from '@mui/material'
import {
  CustomRestaurant,
  Restaurant,
  RestaurantCreate,
} from '../../../models/Restaurant'

type Props = {
  restaurants: (Restaurant | CustomRestaurant)[]
  createParty: () => void
  generalError: string
  setRestaurants: React.Dispatch<
    React.SetStateAction<(Restaurant | CustomRestaurant)[] | undefined>
  >
}

const RestaurantsPreview = ({
  restaurants,
  createParty,
  generalError,
  setRestaurants,
}: Props) => {
  const [customOpen, setCustomOpen] = useState(false)
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

  const createRestaurant = (restaurant: RestaurantCreate) => {
    setCustomOpen(false)
    setRestaurants((prevState) => {
      const obj = {
        ...restaurant,
        location: {
          address1: restaurant.location as string,
        },
      } as CustomRestaurant
      if (!prevState) return [obj]
      return [...prevState, obj]
    })
  }

  return (
    <SlideIn>
      {customOpen && (
        <CustomDialog
          open={customOpen}
          setOpen={setCustomOpen}
          createRestaurant={createRestaurant}
        />
      )}

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
        {generalError && (
          <Typography color='error' mt='10px'>
            {generalError}
          </Typography>
        )}
      </Box>
      <Box m='25px 0'>
        <Box
          onClick={() => setCustomOpen(!customOpen)}
          sx={{
            gap: '15px',
            display: 'flex',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '10px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            border: '0.1px solid white',
          }}
        >
          <Box display='flex' gap='5px' alignItems='center'>
            <Typography color='primary' variant='h4'>
              +
            </Typography>
            <Typography color='primary'>Add a custom restaurant</Typography>
          </Box>
        </Box>
        {restaurants.map((restaurant) => (
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
              {restaurant?.url && (
                <Link href={restaurant?.url} target='_blank'>
                  View on Yelp
                </Link>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </SlideIn>
  )
}

export default RestaurantsPreview
