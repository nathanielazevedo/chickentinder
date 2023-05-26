import { useState } from 'react'
import VoteIcons from './VoteIcons'
import { Swipe, getSwipe } from './SwipeUtils'
import { Box, Typography } from '@mui/material'

type Props = {
  days_to_vote_on: { id: string }[] | undefined
  fDV: () => void
  setDLikes: React.Dispatch<React.SetStateAction<string[]>>
}

const VoteDays = ({ days_to_vote_on, fDV, setDLikes }: Props) => {
  const [swipe, setSwipe] = useState<Swipe>({ id: '', direction: '' })
  const [index, setIndex] = useState<number>(0)
  const length = days_to_vote_on?.length

  if (index === length) {
    fDV()
    return <></>
  }

  const time = days_to_vote_on && days_to_vote_on[index]

  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <Typography variant='h5' alignSelf='flex-end' mb='5px'>
        {index + 1} of {length}
      </Typography>
      <Box className={time && getSwipe(time.id, swipe)} sx={styles.c}>
        <Box sx={styles.iC}>
          <Typography variant='h1'>{time?.id}</Typography>
        </Box>
      </Box>
      <VoteIcons
        index={index}
        item={time}
        items={days_to_vote_on}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setDLikes}
      />
    </Box>
  )
}

export default VoteDays

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
