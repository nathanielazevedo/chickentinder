import { useEffect } from 'react'
import WinnerView from './WinnerView'
import { fetchParty } from '../../state'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import SlideIn from '../../components/SlideIn'
import { Box, Typography } from '@mui/material'
import LinearProgess from '../../components/LinearProgess'
import BackIcon from '../../components/backIcons/BackIconTo'
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
    return <WinnerView party={party} id={id ?? ''} />
  }

  return (
    <>
      <BackIcon to={'/party/' + id} />
      <SlideIn>
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
          {party.vote_on_hours && (
            <Typography variant='h4' mb='10px' mt='20px' alignSelf='flex-start'>
              Hours
            </Typography>
          )}
          {party.vote_on_hours &&
            party.hours_to_vote_on.map((hour) => {
              return (
                <Box key={hour.id} sx={styles.rC}>
                  <Typography color='secondary'>{hour.id}</Typography>
                  <Box width='100%'>
                    <LinearProgess
                      realValue={party.h_votes[hour.id]}
                      value={Math.round(
                        (100 / party.max_voters) * party.h_votes[hour.id]
                      )}
                    />
                  </Box>
                </Box>
              )
            })}
          {party.vote_on_days && (
            <Typography variant='h4' mb='10px' mt='20px' alignSelf='flex-start'>
              Days
            </Typography>
          )}
          {party.vote_on_days &&
            party.days_to_vote_on.map((day) => {
              return (
                <Box key={day.id} sx={styles.rC}>
                  <Typography color='secondary'>{day.id}</Typography>
                  <Box width='100%'>
                    <LinearProgess
                      realValue={party.d_votes[day.id]}
                      value={Math.round(
                        (100 / party.max_voters) * party.d_votes[day.id]
                      )}
                    />
                  </Box>
                </Box>
              )
            })}
        </Box>
      </SlideIn>
    </>
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
