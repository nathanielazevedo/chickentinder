import API from '../../../api'
import VoteTime from './VoteTime'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VoteRestaurant from './VoteRestaurant'
import { Party } from '../../../models/Party'
import { useNavigate } from 'react-router-dom'
import {
  getPartyFromLocal,
  updatePartyInLocal,
} from '../../../utils/localStorage'
import VoteDays from './VoteDays'
import BackIcon from '../../../components/backIcons/BackIconAction'
import BackDialog from '../dialogs/BackDialog'

const Swipe = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [party, setParty] = useState<Party>()
  const [rLikes, setRLikes] = useState<string[]>([])
  const [hLikes, setHLikes] = useState<string[]>([])
  const [dLikes, setDLikes] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [votingStage, setVotingStage] = useState('restaurants')

  useEffect(() => {
    const getParty = async () => {
      if (!id) return
      try {
        const party = await API.getParty(id)
        setParty(party)
        setVotingStage('restaurants')
      } catch {
        console.log('error')
      }
    }

    getParty()
  }, [id, navigate])

  const fRV = async () => {
    if (party?.vote_on_hours) {
      setRLikes(rLikes)
      setVotingStage('times')
      return
    }
    try {
      if (!id) return
      await API.vote(id, rLikes, null, null)

      const party = getPartyFromLocal(id)
      if (party) {
        party.voteRestaurants = rLikes
        party.voted = true
        updatePartyInLocal(party)
      }

      navigate(`/party/${id}/myVotes?c=true`)
    } catch {
      console.log('error')
    }
  }

  const fTV = async () => {
    if (party?.vote_on_days) {
      setVotingStage('days')
      return
    }
    try {
      if (!id) return
      await API.vote(id, rLikes, hLikes, null)

      const party = getPartyFromLocal(id)
      if (party) {
        party.voteRestaurants = rLikes
        party.voteTime = hLikes
        party.voted = true
        updatePartyInLocal(party)
      }

      navigate(`/party/${id}/myVotes?c=true`)
    } catch {
      console.log('error')
    }
  }

  const fDV = async () => {
    try {
      if (!id) return
      await API.vote(id, rLikes, hLikes, dLikes)

      const party = getPartyFromLocal(id)
      if (party) {
        party.voteRestaurants = rLikes
        party.voteTime = hLikes
        party.likedDays = dLikes
        party.voted = true
        updatePartyInLocal(party)
      }

      navigate(`/party/${id}/myVotes?c=true`)
    } catch {
      console.log('error')
    }
  }

  const handleBack = (res: string) => {
    if (res === 'cancel') {
      setDialogOpen(false)
      return
    }
    if (res === 'leave') {
      navigate(`/party/${id}`)
      return
    }
    if (res === 'submit') {
      if (votingStage === 'restaurants') {
        fRV()
      } else if (votingStage === 'times') {
        fTV()
      } else if (votingStage === 'days') {
        fDV()
      }
    }
    navigate(`/party/${id}`)
  }

  if (!id) {
    navigate('/party/' + id)
    return null
  }

  switch (votingStage) {
    case 'restaurants':
      return (
        <>
          <BackIcon action={() => setDialogOpen(true)} />
          <BackDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            handleBack={handleBack}
          />
          <VoteRestaurant
            fRV={fRV}
            setRLikes={setRLikes}
            restaurants={party?.restaurants}
          />
        </>
      )
    case 'times':
      return (
        <>
          <BackIcon action={() => setDialogOpen(true)} />
          <BackDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            handleBack={handleBack}
          />
          <VoteTime
            fTV={fTV}
            setHLikes={setHLikes}
            times_to_vote_on={party?.hours_to_vote_on}
          />
        </>
      )
    case 'days':
      return (
        <>
          <BackIcon action={() => setDialogOpen(true)} />
          <BackDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            handleBack={handleBack}
          />
          <VoteDays
            fDV={fDV}
            setDLikes={setDLikes}
            days_to_vote_on={party?.days_to_vote_on}
          />
        </>
      )
    default:
      return null
  }
}

export default Swipe
