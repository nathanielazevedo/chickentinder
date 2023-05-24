import { useEffect } from 'react'
import { fetchParty } from '../../state'
import RCard from '../../components/RCard'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import { Box, Typography } from '@mui/material'
import LinearProgess from '../../components/LinearProgess'
import { useAppDispatch, useAppSelector } from '../../state/redux'

const Results = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const party = useAppSelector((state) => state.party)

  useEffect(() => {
    try {
      if (!id || party) return
      dispatch(fetchParty(id))
    } catch {
      console.log('error')
    }
  }, [dispatch, id, party])

  if (!party) return <Loading />

  if (party.r_winner) {
    return (
      <>
        <Typography variant='h4' color='secondary'>
          Winner
        </Typography>
        {party.t_winner && (
          <Typography color='secondary'>
            {party.r_winner.name} at {party.t_winner}
          </Typography>
        )}
        <RCard restaurant={party.r_winner} swipe={{ id: '', direction: '' }} />
      </>
    )
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      {party && (
        <Typography variant='h4' alignSelf='flex-start' mb='10px'>
          Restaurants
        </Typography>
      )}
      {party.restaurants.map((restaurant) => {
        return (
          <Box key={restaurant.id} sx={styles.rC}>
            <Typography color='secondary'>{restaurant.name}</Typography>
            <Box width='100%'>
              <LinearProgess
                realValue={party.r_votes[restaurant.id]}
                value={Math.round(
                  (100 / party.max_voters) * party.r_votes[restaurant.id]
                )}
              />
            </Box>
          </Box>
        )
      })}
      {party.vote_on_time && (
        <Typography variant='h4' mb='10px' mt='20px' alignSelf='flex-start'>
          Times
        </Typography>
      )}
      {party.vote_on_time &&
        party.times_to_vote_on.map((time) => {
          return (
            <Box key={time.id} sx={styles.rC}>
              <Typography color='secondary'>{time.id}</Typography>
              <Box width='100%'>
                <LinearProgess
                  realValue={party.t_votes[time.id]}
                  value={Math.round(
                    (100 / party.max_voters) * party.t_votes[time.id]
                  )}
                />
              </Box>
            </Box>
          )
        })}
    </Box>
  )
}

export default Results

const styles = {
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '400px',
    width: { xs: '100%', md: '500px' },
    borderRadius: '10px',
    backgroundColor: 'black',
    position: 'relative',
    padding: '20px',
    minHeight: '300px',
  },
  rC: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
}
