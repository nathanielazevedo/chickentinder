import API from '../../api'
import { setRParty } from '../../state'
import PartyDeleted from './PartyDeleted'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import SlideIn from '../../components/SlideIn'
import { Alert, Box, Chip, Skeleton, Typography } from '@mui/material'
import { useAppSelector } from '../../state/redux'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { toMiles } from '../create/CreateHelpers'
import NewPartyDialog from './dialogs/NewPartyDialog'
import PasswordDialog from './dialogs/PasswordDialog'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
} from '../../utils/localStorage'
import BackIcon from '../../components/backIcons/BackIconTo'

const Entry = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [voted, setVoted] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const party = useAppSelector((state) => state.party)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewDialog, setShowNewDialog] = useState(false)

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return
        const res = await API.getParty(id)
        dispatch(setRParty(res))
        const newParty = { _id: id, voted: false, name: res.name }
        const partiesInLocal = haveLocalParties()
        if (!partiesInLocal) addPartyToLocal(newParty)
        else {
          const party = getPartyFromLocal(id)
          if (!party) addPartyToLocal(newParty)
          else setVoted(party.voted)
        }
        if (searchParams.get('new')) setShowNewDialog(true)
      } catch (error: unknown) {
        const err = error as Error
        console.log('err', err)
        if (err?.message) {
          console.log('err', err.message)
          id && removePartyFromLocal(id)
          setShowDelete(true)
        } else {
          console.log('uh oh')
        }
      }
    }

    getParty()
  }, [dispatch, id, searchParams])

  if (showDelete) return <PartyDeleted />

  return (
    <>
      <BackIcon to='/party/my-parties' />
      <PasswordDialog open={showPassword} setOpen={setShowPassword} />
      <NewPartyDialog open={showNewDialog} setOpen={setShowNewDialog} />
      <SlideIn>
        <Box
          mb='15px'
          sx={{
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid rgb(14, 107, 125)',
            backgroundColor: 'rgb(14, 107, 125, 15%)',
          }}
        >
          <Typography variant='h2' mb='10px'>
            {party?.name ?? <Skeleton variant='text' width={200} />}
          </Typography>

          <Typography color='secondary'>
            {party?.max_distance ? (
              `Within ${
                party?.max_distance && toMiles(party?.max_distance)
              } miles from ${party?.location}.`
            ) : (
              <Skeleton variant='text' width={200} />
            )}
          </Typography>
          {party?.vote_on_hours && (
            <>
              <Typography color='secondary' alignSelf='flex-start'>
                {party.hours_to_vote_on.length} times to vote on.
              </Typography>
            </>
          )}
          <Typography color='secondary'>
            {party?.restaurants.length ? (
              `${party?.restaurants.length} ${party?.type} to vote on.`
            ) : (
              <Skeleton variant='text' width={200} />
            )}
          </Typography>
          <Typography color='secondary'>
            {party?.voters_so_far !== undefined ? (
              `${party?.voters_so_far}/${party?.max_voters} people have voted.`
            ) : (
              <Skeleton variant='text' width={200} />
            )}
          </Typography>
          {party?.r_winner && (
            <Typography mt='20px' color='error'>
              This party is closed. The winner is {party?.r_winner?.name}.
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Link
            to={
              voted
                ? `/party/${id}/myVotes`
                : party?.r_winner
                ? `/party/${id}`
                : `/party/${id}/vote`
            }
          >
            <Chip
              label={
                voted
                  ? 'View My Votes'
                  : party?.r_winner
                  ? 'Party Over'
                  : 'Vote'
              }
              variant='outlined'
              clickable
              icon={
                <HowToVoteOutlinedIcon
                  sx={{ color: 'rgb(14, 107, 125)', fontSize: '16px' }}
                />
              }
            />
          </Link>
          <Link to={`/party/${id}/results`}>
            <Chip
              label={party?.r_winner ? 'View Winner' : 'View Votes'}
              variant='outlined'
              clickable
              icon={
                <RemoveRedEyeOutlinedIcon
                  sx={{ color: 'rgb(14, 107, 125)', fontSize: '16px' }}
                />
              }
            />
          </Link>
          <Chip
            label='Manage'
            variant='outlined'
            onClick={() => setShowPassword(true)}
            icon={
              <ManageAccountsOutlinedIcon
                sx={{ color: 'rgb(14, 107, 125)', fontSize: '16px' }}
              />
            }
          />
          <Chip
            label='Share'
            variant='outlined'
            clickable
            icon={
              <ShareOutlinedIcon
                sx={{ color: 'rgb(14, 107, 125)', fontSize: '16px' }}
              />
            }
          />
        </Box>
        {party?.r_winner && (
          <Alert
            severity='success'
            variant='outlined'
            sx={{
              marginTop: '20px',
            }}
          >
            This party is over!
          </Alert>
        )}
      </SlideIn>
    </>
  )
}

export default Entry
