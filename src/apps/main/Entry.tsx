import API from '../../api'
import PartyDeleted from './PartyDeleted'
import { Party } from '../../models/Party'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'
import NewPartyDialog from './dialogs/NewPartyDialog'
import PasswordDialog from './dialogs/PasswordDialog'
import { getBaseUrl, toMiles } from '../../utils/general'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
  setFirstParty,
} from '../../utils/localStorage'

const Entry = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [voted, setVoted] = useState(false)
  const [party, setParty] = useState<Party>()
  const [showDelete, setShowDelete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewDialog, setShowNewDialog] = useState(false)

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return
        const res = await API.getParty(id)
        const newParty = { _id: id, voted: false, name: res.name }
        const partiesInLocal = haveLocalParties()
        if (!partiesInLocal) setFirstParty(newParty)
        else {
          const party = getPartyFromLocal(id)
          if (!party) addPartyToLocal(newParty)
          else setVoted(party.voted)
        }
        if (searchParams.get('new')) setShowNewDialog(true)
        setParty(res)
      } catch {
        id && removePartyFromLocal(id)
        setShowDelete(true)
      }
    }

    getParty()
  }, [id, searchParams])

  if (showDelete) return <PartyDeleted />
  if (!party) return <Loading />

  return (
    <>
      <PasswordDialog open={showPassword} setOpen={setShowPassword} />
      <NewPartyDialog open={showNewDialog} setOpen={setShowNewDialog} />
      <Box
        mb='30px'
        sx={{
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid rgb(14, 107, 125)',
          backgroundColor: 'rgb(14, 107, 125, 15%)',
        }}
      >
        <Typography variant='h2' mb='10px'>
          {party.name}
        </Typography>
        <Typography variant='h5'>Details:</Typography>
        <Typography color='secondary'>
          Within {toMiles(party.max_distance)} miles from {party.location}.
        </Typography>
        {party.vote_on_time && (
          <>
            <Typography color='secondary' alignSelf='flex-start'>
              Your party is voting on a time to meet.
            </Typography>
            <Typography color='secondary' alignSelf='flex-start'>
              {party.times_to_vote_on.length} times to vote on.
            </Typography>
          </>
        )}
        <Typography color='secondary'>
          {party.restaurants.length} {party.type} to vote on.
        </Typography>
        <Typography color='secondary'>
          {party.voters_so_far}/{party.max_voters} people have voted.
        </Typography>
        <Typography mt='10px' variant='h5'>
          Party link:
          <Typography
            fontSize='11px'
            color='primary.main'
            sx={{ wordBreak: 'break-word' }}
          >
            {getBaseUrl() + 'party/' + party._id}
          </Typography>
        </Typography>
        {party.r_winner && (
          <Typography mt='20px' color='error'>
            This party is closed. The winner is {party?.r_winner?.name}.
          </Typography>
        )}
      </Box>
      <Box display='flex' flexDirection='column' gap='20px' width='100%'>
        <Typography variant='h4' color='secondary'>
          What would you like to do?
        </Typography>
        <Link
          to={voted ? `/party/${id}/myVotes` : `/party/${id}/vote`}
          style={{ height: '50px' }}
        >
          <MainButton text={voted ? 'View My Votes' : 'Vote'} />
        </Link>
        <Link
          to={`/party/${id}/results`}
          style={{ width: '100%', height: '50px' }}
        >
          <MainButton
            text={party.r_winner ? 'View Winner' : 'View All Votes'}
          />
        </Link>
        <Box sx={{ height: '50px' }}>
          <MainButton
            text='Manage Party'
            onClick={() => setShowPassword(true)}
          />
        </Box>
      </Box>
    </>
  )
}

export default Entry
