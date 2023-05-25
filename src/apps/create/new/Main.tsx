import RForm from './RForm'
import api from '../../../api'
import CStepper from './Stepper'
import { useState } from 'react'
import RPreview from './RPreview'
import Personal from './Personal'
import Time from './time/TimeMain'
import VotersInfo from './VotersInfo'
import { CreateParty } from '../../../models/Party'
import { restaurants as rMock } from '../../../mockData/mockR'
import { CustomRestaurant, Restaurant } from '../../../models/Restaurant'
import {
  PersonalType,
  RFormType,
  daysInitial,
  getLikedDays,
  getLikedHours,
  hoursInitial,
  pInitial,
  rValuesInitial,
  votersInitial,
} from './CreateHelpers'

type R = (Restaurant | CustomRestaurant)[]

const Main = () => {
  const [step, setStep] = useState(0)
  const [restaurants, setRestaurants] = useState<R>()

  /// Form Data
  const [days, setDays] = useState(daysInitial)
  const [hours, setHours] = useState(hoursInitial)
  const [voters, setVoters] = useState(votersInitial)
  const [timeQuestion, setTimeQuestion] = useState('')
  const [rFormData, setrFormData] = useState(rValuesInitial)
  const [personalData, setPersonalData] = useState(pInitial)

  const fetchRestaurants = async (rFormData: RFormType) => {
    setrFormData(rFormData)
    // const restaurants = await api.fetchRestaurants(rFormData)
    setRestaurants(rMock)
    setStep(1)
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

  const createParty = (personalData: PersonalType) => {
    setPersonalData(personalData)
    let vote_on_days = false
    if (timeQuestion === 'Just Day') vote_on_days = true
    if (timeQuestion === 'Time and Day') vote_on_days = true
    let vote_on_hours = false
    if (timeQuestion === 'Just Time') vote_on_hours = true
    if (timeQuestion === 'Time and Day') vote_on_hours = true

    const data = {
      restaurants,
      ...rFormData,
      vote_on_hours,
      vote_on_days,
      ...personalData,
      max_voters: voters.max_voters,
      days_to_vote_on: getLikedDays(days),
      hours_to_vote_on: getLikedHours(hours),
    } as CreateParty
    console.log(data)
  }

  const steps = [
    {
      component: () => (
        <RForm formData={rFormData} fetchRestaurants={fetchRestaurants} />
      ),
    },
    {
      component: () => {
        if (!restaurants) return null
        else
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
          setVoters={setVoters}
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
  ]

  return (
    <>
      <CStepper step={step} steps={steps} />
      {steps[step].component()}
    </>
  )
}

export default Main
