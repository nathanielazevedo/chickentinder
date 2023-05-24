import API from '../../api'
import Results from './Results'
import { fetchParty, endParty as rEndParty } from '../../state'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../state/redux'
import Loading from '../../components/Loading'

const Manage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const [winner, setWinner] = useState(false)
  const party = useAppSelector((state) => state.party)

  useEffect(() => {
    try {
      if (!id || party) return
      dispatch(fetchParty(id))
    } catch {
      console.log('error')
    }
  }, [dispatch, id, party])

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
          <Typography variant='h3'>{party.name}</Typography>
          <Typography mb='15px' color='secondary'>
            {party.voters_so_far} / {party.max_voters} voters have voted
          </Typography>
          <Results />
          {!party.r_winner && (
            <Button
              color='error'
              variant='outlined'
              onClick={endParty}
              sx={{
                fontSize: '12px',
                position: 'absolute',
                top: '20px',
                right: '10px',
              }}
            >
              End voting
            </Button>
          )}
        </>
      )}
    </>
  )
}

export default Manage
