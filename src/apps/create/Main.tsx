import API from '../../api'
import { useState } from 'react'
import CreateForm from './CreateForm'
import { useNavigate } from 'react-router-dom'
import CreateLoad from '../../components/Loading'
import RestaurantsPreview from './RestaurantsPreview'
import { addPartyToLocal } from '../../utils/localStorage'
import { CustomRestaurant, Restaurant } from '../../models/Restaurant'
import {
  hoursInitial,
  valueInitial,
  valueType,
  getLikedHours,
  addChecks,
  getCheckedRestaurants,
  getLikedLength,
  noRMessage,
} from './CreateHelpers'

const Create = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hours, setHours] = useState(hoursInitial)
  const [timeError, setTimeError] = useState(false)
  const [values, setValues] = useState(valueInitial)
  const [voteOnTime, setVoteOnTime] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [restaurants, setRestaurants] =
    useState<(Restaurant | CustomRestaurant)[]>()

  const fetchRestaurants = async (values: valueType) => {
    if (voteOnTime && getLikedLength(hours) < 2) return setTimeError(true)
    setValues(values)
    setLoading(true)
    try {
      const restaurants = await API.fetchRestaurants(values)
      const { error } = restaurants
      if (error?.message) setGeneralError(error.message)
      else if (!restaurants.length) setGeneralError(noRMessage)
      else setRestaurants(addChecks(restaurants))
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const createParty = async () => {
    if (!restaurants) return
    const party = await API.createParty({
      ...values,
      restaurants: getCheckedRestaurants(restaurants),
      vote_on_time: voteOnTime,
      times_to_vote_on: getLikedHours(hours),
    })
    const { _id, name } = party
    addPartyToLocal({ _id, name, voted: false })
    navigate(`/party/${_id}?new=true`)
  }

  if (loading) return <CreateLoad />

  if (restaurants) {
    return (
      <RestaurantsPreview
        restaurants={restaurants}
        createParty={createParty}
        setRestaurants={setRestaurants}
      />
    )
  }

  return (
    <CreateForm
      values={values}
      fetchRestaurants={fetchRestaurants}
      voteTime={voteOnTime}
      setVoteTime={setVoteOnTime}
      hours={hours}
      setHours={setHours}
      timeError={timeError}
      generalError={generalError}
      setTimeError={setTimeError}
    />
  )
}

export default Create
