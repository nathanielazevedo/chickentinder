import CustomDialog from './CustomDialog'
import { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import SlideIn from '../../components/SlideIn'
import { Box, Chip, Link, Skeleton, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'
import {
  CustomRestaurant,
  Restaurant,
  RestaurantCreate,
} from '../../models/Restaurant'
import BackIconAction from '../../components/backIcons/BackIconAction'

type Props = {
  restaurants: (Restaurant | CustomRestaurant)[] | undefined
  completeRestaurants: () => void
  fetchMore: () => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  setRestaurants: React.Dispatch<
    React.SetStateAction<(Restaurant | CustomRestaurant)[] | undefined>
  >
}

const RPreview = ({
  restaurants,
  completeRestaurants,
  fetchMore,
  setRestaurants,
  setStep,
}: Props) => {
  const [customOpen, setCustomOpen] = useState(false)

  const handleCheck = (id: string) => {
    setRestaurants((prevState) => {
      if (!prevState) return []
      const newRestaurants = prevState.map((restaurant) => {
        if (restaurant.id === id)
          return { ...restaurant, checked: !restaurant.checked }
        return restaurant
      })
      return [...newRestaurants]
    })
  }

  const checkedLength = () => {
    const checked = restaurants?.filter((restaurant) => restaurant.checked)
    return checked?.length ? checked.length < 2 : true
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

  const clearUnChecked = () => {
    setRestaurants((prevState) => {
      if (!prevState) return []
      const newRestaurants = prevState.filter(
        (restaurant) => restaurant.checked
      )
      return [...newRestaurants]
    })
  }

  return (
    <>
      <BackIconAction action={() => setStep(0)} />
      <SlideIn>
        {customOpen && (
          <CustomDialog
            open={customOpen}
            setOpen={setCustomOpen}
            createRestaurant={createRestaurant}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant='h5'>These are the places I found.</Typography>
            <Typography color='secondary'>
              Uncheck the ones you don't like.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '90px',
            }}
          >
            <MainButton
              disabled={restaurants && checkedLength()}
              onClick={completeRestaurants}
              text='Next'
            />
          </Box>
        </Box>
        <Box
          sx={{
            minHeight: '21px',
          }}
        >
          {restaurants && checkedLength() && (
            <Typography
              color='error'
              mt='0px'
              sx={{
                fontSize: '12px',
              }}
            >
              You must select at least 2 places.
            </Typography>
          )}
        </Box>
        <Box m='5px 0'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Chip
              label='Clear Unchecked'
              variant='outlined'
              onClick={clearUnChecked}
            />
            <Chip label='Fetch More' variant='outlined' onClick={fetchMore} />
            <Chip
              label='Create Custom'
              variant='outlined'
              onClick={() => setCustomOpen(true)}
            />
          </Box>
          {restaurants ? (
            restaurants.map((restaurant) => (
              <Box
                key={restaurant.id}
                sx={{
                  gap: '15px',
                  display: 'flex',
                  padding: '10px',
                  margin: '10px 0',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: '1px solid grey',
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
            ))
          ) : (
            <Box display='flex' flexDirection='column' gap='15px' mt='20px'>
              <Skeleton variant='rectangular' width='100%' height={50} />
              <Skeleton variant='rectangular' width='100%' height={50} />
              <Skeleton variant='rectangular' width='100%' height={50} />
            </Box>
          )}
        </Box>
      </SlideIn>
    </>
  )
}

export default RPreview
