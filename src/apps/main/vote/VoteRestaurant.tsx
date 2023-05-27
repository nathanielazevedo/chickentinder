import VoteIcons from './VoteIcons'
import { Swipe } from './SwipeUtils'
import { useEffect, useState } from 'react'
import RCard from '../../../components/RCard'
import { Box, Typography } from '@mui/material'
import { Restaurant } from '../../../models/Restaurant'

type Props = {
  fRV: () => void
  restaurants: Restaurant[] | undefined
  setRLikes: React.Dispatch<React.SetStateAction<string[]>>
}

const VoteRestaurant = ({ restaurants, fRV, setRLikes }: Props) => {
  const [index, setIndex] = useState<number>(0)
  const length = restaurants && restaurants.length
  const restaurant = restaurants && restaurants[index]
  const [swipe, setSwipe] = useState<Swipe>({ id: '', direction: '' })

  useEffect(() => {
    restaurants?.forEach((restaurant) => {
      const img = new Image()
      img.src = restaurant.image_url
    })
  }, [restaurants])

  if (index === length) {
    fRV()
    return <></>
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
        setLikes={setRLikes}
      />
    </Box>
  )
}

export default VoteRestaurant
