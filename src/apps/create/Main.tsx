import RForm from './RForm'
import api from '../../api'
import CStepper from './Stepper'
import { useState } from 'react'
import RPreview from './RPreview'
import Personal from './Personal'
import Time from './time/TimeMain'
import VotersInfo from './VotersInfo'
import { useNavigate } from 'react-router-dom'
import { CreateParty } from '../../models/Party'
import { CustomRestaurant, Restaurant } from '../../models/Restaurant'
import {
  PersonalType,
  RFormType,
  addChecks,
  daysInitial,
  getCheckedRestaurants,
  getLikedDays,
  getLikedHours,
  hoursInitial,
  pInitial,
  rValuesInitial,
  votersInitial,
} from './CreateHelpers'
import Loading from '../../components/Loading'

type R = (Restaurant | CustomRestaurant)[]

const Main = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [days, setDays] = useState(daysInitial)
  const [hours, setHours] = useState(hoursInitial)
  const [timeAnswer, setTimeAnswer] = useState('')
  const [restaurants, setRestaurants] = useState<R>()
  const [voters, setVoters] = useState(votersInitial)
  const [timeQuestion, setTimeQuestion] = useState('')
  const [rFormData, setrFormData] = useState(rValuesInitial)
  const [personalData, setPersonalData] = useState(pInitial)

  const fetchRestaurants = async (rFormData: RFormType) => {
    setStep(1)
    setrFormData(rFormData)
    const restaurants = await api.fetchRestaurants(rFormData)
    const withChecks = addChecks(restaurants)
    setRestaurants(withChecks)
  }

  const completeRestaurants = () => {
    setStep(2)
  }

  const completeTime = (question: string) => {
    setTimeQuestion(question)
    setStep(3)
  }

  const completeVoteInfo = (value: typeof votersInitial) => {
    setVoters(value)
    setStep(4)
  }

  const createParty = async (personalData: PersonalType) => {
    if (!restaurants) return
    setPersonalData(personalData)
    let vote_on_days = false
    if (timeQuestion === 'Just Day') vote_on_days = true
    if (timeQuestion === 'Time and Day') vote_on_days = true
    let vote_on_hours = false
    if (timeQuestion === 'Just Time') vote_on_hours = true
    if (timeQuestion === 'Time and Day') vote_on_hours = true

    const data = {
      restaurants: getCheckedRestaurants(restaurants),
      ...rFormData,
      vote_on_hours,
      vote_on_days,
      ...personalData,
      max_voters: voters.max_voters,
      days_to_vote_on: getLikedDays(days),
      hours_to_vote_on: getLikedHours(hours),
    } as CreateParty
    try {
      setStep(5)
      const party = await api.createParty(data)
      navigate('/party/' + party._id + '?new=true')
    } catch {
      setStep(4)
      console.log('error')
    }
  }

  const steps = [
    {
      component: () => (
        <RForm formData={rFormData} fetchRestaurants={fetchRestaurants} />
      ),
    },
    {
      component: () => {
        return (
          <RPreview
            setStep={setStep}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
            completeRestaurants={completeRestaurants}
          />
        )
      },
    },
    {
      component: () => (
        <Time
          completeTime={completeTime}
          timeAnswer={timeAnswer}
          setTimeAnswer={setTimeAnswer}
          setStep={setStep}
          hours={hours}
          setHours={setHours}
          days={days}
          setDays={setDays}
        />
      ),
    },
    {
      component: () => (
        <VotersInfo
          voters={voters}
          setStep={setStep}
          completeVoteInfo={completeVoteInfo}
        />
      ),
    },
    {
      component: () => (
        <Personal
          setStep={setStep}
          createParty={createParty}
          personalData={personalData}
          setPersonalData={setPersonalData}
        />
      ),
    },
    {
      component: () => <Loading />,
    },
  ]

  return (
    <>
      <CStepper step={step} steps={steps.slice(0, 5)} />
      {steps[step].component()}
    </>
  )
}

export default Main
