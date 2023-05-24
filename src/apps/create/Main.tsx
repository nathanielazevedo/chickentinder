import API from '../../api'
import { useState } from 'react'
import CreateForm from './CreateForm'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import BackIcon from '../../components/BackIcon'
import { CSSProperties, useEffect } from 'react'
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

import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from '@react-spring/web'

const Create = () => {
  const navigate = useNavigate()
  const [hours, setHours] = useState(hoursInitial)
  const [timeError, setTimeError] = useState(false)
  const [values, setValues] = useState(valueInitial)
  const [voteOnTime, setVoteOnTime] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [restaurants, setRestaurants] = useState<(Restaurant | CR)[]>()

  const [index, set] = useState(0)
  const onClick = () => set((state) => (state + 1) % 3)
  const transRef = useSpringRef()

  const fetchRestaurants = async (values: valueType) => {
    if (voteOnTime && getLikedLength(hours) < 2) return setTimeError(true)
    setValues(values)
    onClick()
    try {
      setRestaurants(addChecks(await API.fetchRestaurants(values)))
      onClick()
      setGeneralError('')
    } catch {
      setGeneralError('There was an error fetching restaurants.')
    }
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
    }
  }

  useEffect(() => {
    transRef.start()
  }, [index, transRef])

  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(40%,0%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-40%,0,0)' },
  })

  // if (loading) return <CreateLoad />

  const pages: ((
    props: AnimatedProps<{ style: CSSProperties }>
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <>
        <BackIcon customRoute='/' />
        <animated.div
          style={{ ...style, display: index !== 0 ? 'none' : 'inherit' }}
        >
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
        </animated.div>
      </>
    ),
    ({ style }) => (
      <animated.div
        style={{ ...style, display: index !== 1 ? 'none' : 'inherit' }}
      >
        <Loading />
      </animated.div>
    ),
    ({ style }) => (
      <>
        <BackIcon customAction={() => set(0)} />
        <animated.div
          style={{ ...style, display: index !== 2 ? 'none' : 'inherit' }}
        >
          <RestaurantsPreview
            restaurants={restaurants ?? []}
            createParty={createParty}
            generalError={generalError}
            setRestaurants={setRestaurants}
          />
        </animated.div>
      </>
    ),
  ]

  return transitions((style, i) => {
    const Page = pages[i]

    return <Page style={style} />
  })
}

export default Create
