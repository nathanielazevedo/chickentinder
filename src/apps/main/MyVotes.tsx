import { fetchParty } from '../../state'
import { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import CreateLoad from '../../components/Loading'
import { Restaurant } from '../../models/Restaurant'
import MyVoteConfirmation from './dialogs/MyVoteConfirmation'
import { useAppDispatch, useAppSelector } from '../../state/redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  getPartiesFromLocal,
  getPartyFromLocal,
} from '../../utils/localStorage'
import SlideIn from '../../components/SlideIn'

const MyVotes = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [showC, setShowC] = useState(false)
  const [tLikes, setTLikes] = useState<string[]>()
  const party = useAppSelector((state) => state.party)
  const [restaurants, setRestaurants] = useState<Restaurant[]>()

  useEffect(() => {
    const getParty = async () => {
      if (!id) return navigate('/')
      if (!party) return dispatch(fetchParty(id))
      const partiesInLocal = getPartiesFromLocal()
      if (!partiesInLocal) navigate('/party/' + id)
      else {
        const lParty = getPartyFromLocal(id)
        if (!lParty || !lParty.voted) navigate('/party/' + id)
        else {
          setRestaurants(
            party.restaurants.filter((restaurant) =>
              lParty.voteRestaurants.includes(restaurant.id)
            )
          )
          if (lParty.voteTime) setTLikes(lParty.voteTime)
          else setTLikes([])
        }
      }
      searchParams.get('c') && setShowC(true)
    }
    getParty()
  }, [dispatch, id, navigate, party, searchParams])

  if (!restaurants || !tLikes || !id) return <CreateLoad />

  return (
    <>
      <MyVoteConfirmation open={showC} setOpen={setShowC} />
      <SlideIn>
        <Typography variant='h4' mb='20px'>
          Liked restaurants
        </Typography>
        {restaurants.length != 0 && restaurants && (
          <Box display='flex' flexDirection='column' gap='10px'>
            {restaurants.map((restaurant) => (
              <Box
                key={restaurant.id}
                sx={{
                  padding: '10px',
                  borderRadius: '10px',
                  position: 'relative',
                  border: '0.1px solid white',
                }}
              >
                <Box
                  sx={{
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color='secondary'>{restaurant.name}</Typography>
                    <a href={restaurant.url} target='_blank'>
                      <Typography sx={styles.link}>View on Yelp</Typography>
                    </a>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {tLikes.length > 0 && (
          <Box>
            <Typography variant='h4' mb='20px' mt='20px'>
              Liked times
            </Typography>
            {tLikes.map((time) => (
              <Box
                p='10px'
                mb='10px'
                key={time}
                borderRadius='10px'
                border='0.1px solid white'
              >
                <Typography color='secondary'>{time}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </SlideIn>
    </>
  )
}

export default MyVotes

const styles = {
  link: {
    textDecoration: 'underline',
    color: 'primary.main',
  },
}
