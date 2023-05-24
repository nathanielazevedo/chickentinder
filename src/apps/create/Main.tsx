import API from '../../api'
import { useState } from 'react'
import CreateForm from './CreateForm'
import { useNavigate } from 'react-router-dom'
import CreateLoad from '../../components/Loading'
import RestaurantsPreview from './RestaurantsPreview'
import { addPartyToLocal } from '../../utils/localStorage'
import { CustomRestaurant as CR, Restaurant } from '../../models/Restaurant'
import {
  hoursInitial,
  valueInitial,
  valueType,
  getLikedHours,
  addChecks,
  getCheckedRestaurants,
  getLikedLength,
} from './CreateHelpers'

const Create = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hours, setHours] = useState(hoursInitial)
  const [timeError, setTimeError] = useState(false)
  const [values, setValues] = useState(valueInitial)
  const [voteOnTime, setVoteOnTime] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [restaurants, setRestaurants] = useState<(Restaurant | CR)[]>()

  const fetchRestaurants = async (values: valueType) => {
    if (voteOnTime && getLikedLength(hours) < 2) return setTimeError(true)
    setValues(values)
    setLoading(true)
    try {
      setRestaurants(addChecks(await API.fetchRestaurants(values)))
      setGeneralError('')
    } catch {
      setGeneralError('There was an error fetching restaurants.')
    }
    setLoading(false)
  }

  const createParty = async () => {
    if (!restaurants) return
    try {
      const party = await API.createParty({
        ...values,
        restaurants: getCheckedRestaurants(restaurants),
        vote_on_time: voteOnTime,
        times_to_vote_on: getLikedHours(hours),
      })
      const { _id, name } = party
      addPartyToLocal({ _id, name, voted: false })
      navigate(`/party/${_id}?new=true`)
    } catch {
      setGeneralError('There was an error creating the party.')
      setLoading(false)
    }
  }

  if (loading) return <CreateLoad />

  if (restaurants) {
    return (
      <RestaurantsPreview
        restaurants={restaurants}
        createParty={createParty}
        generalError={generalError}
        setRestaurants={setRestaurants}
      />
    )
  }

  return (
    <CreateForm
      values={values}
      hours={hours}
      setHours={setHours}
      timeError={timeError}
      voteTime={voteOnTime}
      setVoteTime={setVoteOnTime}
      generalError={generalError}
      setTimeError={setTimeError}
      fetchRestaurants={fetchRestaurants}
    />
  )
}

export default Create
