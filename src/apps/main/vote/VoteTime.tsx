import { useState } from 'react'
import VoteIcons from './VoteIcons'
import { Swipe, getSwipe } from './SwipeUtils'
import { Box, Typography } from '@mui/material'

type Props = {
  times_to_vote_on: { id: string }[]
  fTV: (likes: string[]) => void
}

const VoteTime = ({ times_to_vote_on, fTV }: Props) => {
  const [swipe, setSwipe] = useState<Swipe>({ id: '', direction: '' })
  const [likes, setLikes] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)
  const length = times_to_vote_on.length

  if (index === length) {
    fTV(likes)
    return <></>
  }

  const time = times_to_vote_on[index]

  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <Typography variant='h5' alignSelf='flex-end' mb='5px'>
        {index + 1} of {length}
      </Typography>
      <Box className={getSwipe(time.id, swipe)} sx={styles.c}>
        <Box sx={styles.iC}>
          <Typography variant='h1'>{time.id}</Typography>
        </Box>
      </Box>
      <VoteIcons
        index={index}
        item={time}
        items={times_to_vote_on}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setLikes}
      />
    </Box>
  )
}

export default VoteTime

const styles = {
  c: {
    height: '350px',
    display: 'flex',
    borderRadius: '10px',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: { xs: '350px', md: '500px' },
  },
  iC: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}
