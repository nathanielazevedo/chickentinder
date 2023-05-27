import API from '../../api'
import { setRParty } from '../../state'
import PartyDeleted from './PartyDeleted'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import SlideIn from '../../components/SlideIn'
import { toMiles } from '../create/CreateHelpers'
import { useAppSelector } from '../../state/redux'
import NewPartyDialog from './dialogs/NewPartyDialog'
import PasswordDialog from './dialogs/PasswordDialog'
import BackIcon from '../../components/backIcons/BackIconTo'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Alert, Box, Chip, Skeleton, Typography } from '@mui/material'
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
} from '../../utils/localStorage'

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
        if (err?.message) {
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
          mt='15px'
          sx={{
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid rgb(14, 107, 125)',
            // backgroundColor: 'rgb(14, 107, 125, 15%)',
          }}
        >
          <Typography variant='h3'>
            {party?.name ?? <Skeleton variant='text' width={200} />}
          </Typography>
          <Typography color='secondary' mt='10px'>
            {party?.max_distance ? (
              `Within ${
                party?.max_distance && toMiles(party?.max_distance)
              } miles from ${party?.location}.`
            ) : (
              <Skeleton variant='text' width={200} />
            )}
          </Typography>
        </Box>
        {party?.r_winner && (
          <Alert
            severity='warning'
            variant='outlined'
            sx={{
              margin: '20px 0px',
            }}
          >
            This party is over! Enjoy the party!
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '20px 0px',
          }}
        >
          <Link
            to={
              voted
                ? `/party/${id}/myVotes`
                : party?.r_winner
                ? `/party/${id}/myVotes`
                : `/party/${id}/vote`
            }
          >
            <Chip
              label={voted ? 'My Votes' : party?.r_winner ? 'My Votes' : 'Vote'}
              variant='outlined'
              clickable
              icon={<HowToVoteOutlinedIcon sx={{ fontSize: '16px' }} />}
            />
          </Link>
          <Link to={`/party/${id}/results`}>
            <Chip
              label={party?.r_winner ? 'Winner' : 'All Votes'}
              variant='outlined'
              clickable
              icon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: '16px' }} />}
            />
          </Link>
          <Chip
            label='Manage'
            variant='outlined'
            onClick={() => setShowPassword(true)}
            icon={<ManageAccountsOutlinedIcon sx={{ fontSize: '16px' }} />}
          />
          <Chip
            label='Share'
            variant='outlined'
            clickable
            icon={<ShareOutlinedIcon sx={{ fontSize: '16px' }} />}
            onClick={async () => {
              try {
                await navigator.share({
                  title: party?.name ?? 'Chicken Tinder',
                  text: `thechickentinder.com/party/${id}`,
                  url: `thechickentinder.com/party/${id}`,
                })
              } catch {
                console.log('hello')
              }
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
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
              // backgroundColor: 'rgb(14, 107, 125, 15%)',
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
              // backgroundColor: 'rgb(14, 107, 125, 15%)',
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
              // backgroundColor: 'rgb(14, 107, 125, 15%)',
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
              // backgroundColor: 'rgb(14, 107, 125, 15%)',
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
              // backgroundColor: 'rgb(14, 107, 125, 15%)',
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
      </SlideIn>
    </>
  )
}

export default Entry
