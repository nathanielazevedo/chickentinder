import API from '../../api'
import Results from './Results'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import BackIcon from '../../components/backIcons/BackIconTo'
import { fetchParty, endParty as rEndParty } from '../../state'
import { Box, Chip, Skeleton, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/redux'

const Manage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [winner, setWinner] = useState(false)
  const party = useAppSelector((state) => state.party)

  useEffect(() => {
    try {
      if (!id || party) return
      dispatch(fetchParty(id))
    } catch {
      navigate('/party' + id)
    }
  }, [dispatch, id, navigate, party])

  //todo move this into redux
  const endParty = async () => {
    try {
      if (!id || !party) return
      dispatch(rEndParty(id))
      await API.endParty(id)
      setWinner(true)
    } catch (err) {
      console.log(err)
    }
  }

  if (winner) return <Results />
  if (!party) return <Loading />
  return (
    <>
      {party && (
        <>
          <BackIcon to={`/party/${id}`} />
          <Typography variant='h3'>{party.name}</Typography>
          <Typography color='secondary' mt='10px'>
            Edit or end your party
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              mt: '20px',
            }}
          >
            <Chip
              variant='outlined'
              label='Edit Party'
              clickable
              onClick={endParty}
            />
            <Chip
              variant='outlined'
              label='Edit'
              clickable
              onClick={endParty}
            />
            <Chip
              variant='outlined'
              label='End Voting'
              clickable
              onClick={endParty}
            />
            {!party.r_winner && (
              <Chip
                variant='outlined'
                label='End Voting'
                clickable
                color='error'
                onClick={endParty}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: '20px',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                flex: '40%',
                width: '100%',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgb(14, 107, 125)',
                backgroundColor: 'rgb(14, 107, 125, 15%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                {party?.voters_so_far !== undefined ? (
                  `${party?.voters_so_far}`
                ) : (
                  <Skeleton variant='text' width={50} />
                )}
              </Typography>
              <Typography variant='h6' color='secondary'>
                Voters So Far
              </Typography>
            </Box>
            <Box
              sx={{
                flex: '40%',
                width: '100%',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgb(14, 107, 125)',
                backgroundColor: 'rgb(14, 107, 125, 15%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                {party?.max_voters !== undefined ? (
                  `${party?.max_voters}`
                ) : (
                  <Skeleton variant='text' width={50} />
                )}
              </Typography>
              <Typography variant='h6' color='secondary'>
                Party Size
              </Typography>
            </Box>

            <Box
              mt='0px'
              sx={{
                flex: '40%',
                width: '100%',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgb(14, 107, 125)',
                backgroundColor: 'rgb(14, 107, 125, 15%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                {party?.restaurants !== undefined ? (
                  `${party?.restaurants.length}`
                ) : (
                  <Skeleton variant='text' width={50} />
                )}
              </Typography>
              <Typography variant='h6' color='secondary'>
                {party?.type}
              </Typography>
            </Box>
            <Box
              mt='0px'
              sx={{
                flex: '40%',
                width: '100%',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgb(14, 107, 125)',
                backgroundColor: 'rgb(14, 107, 125, 15%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                {party?.max_voters !== undefined ? (
                  ` ${party.hours_to_vote_on.length}`
                ) : (
                  <Skeleton variant='text' width={50} />
                )}
              </Typography>
              <Typography variant='h6' color='secondary'>
                Hours to vote on.
              </Typography>
            </Box>
            <Box
              mb='15px'
              mt='0px'
              sx={{
                flex: '40%',
                width: '100%',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid rgb(14, 107, 125)',
                backgroundColor: 'rgb(14, 107, 125, 15%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>
                {party?.vote_on_days !== undefined ? (
                  ` ${party.days_to_vote_on.length}`
                ) : (
                  <Skeleton variant='text' width={50} />
                )}
              </Typography>
              <Typography variant='h6' color='secondary'>
                Days to vote on.
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default Manage
