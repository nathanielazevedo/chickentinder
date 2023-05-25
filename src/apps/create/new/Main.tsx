import RForm from './RForm'
import api from '../../../api'
import CStepper from './Stepper'
import { useState } from 'react'
import RPreview from './RPreview'
import Personal from './Personal'
import Time from './time/TimeMain'
import VotersInfo from './VotersInfo'
import { restaurants as rMock } from '../../../mockData/mockR'
import { CustomRestaurant, Restaurant } from '../../../models/Restaurant'
import {
  daysInitial,
  hoursInitial,
  pInitial,
  rInitial,
  rValuesInitial,
  votersInitial,
} from './CreateHelpers'
import { Party } from '../../../models/Party'

type R = (Restaurant | CustomRestaurant)[]

const Main = () => {
  const [step, setStep] = useState(0)
  const [restaurants, setRestaurants] = useState<R>()
  const [generalError, setGeneralError] = useState('')

  /// Form Data
  const [days, setDays] = useState(daysInitial)
  const [hours, setHours] = useState(hoursInitial)
  const [voters, setVoters] = useState(votersInitial)
  const [timeQuestion, setTimeQuestion] = useState('')
  const [rFormData, setrFormData] = useState(rValuesInitial)
  const [personalData, setPersonalData] = useState(pInitial)

  const fetchRestaurants = async (rFormData: rInitial) => {
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

  const createParty = (personalData: any) => {
    setPersonalData(personalData)
    const data = {
      restaurants,
      vote_on_time: timeQuestion,
      days,
      hours,
      voters,
      ...personalData,
      ...rFormData,
    } as Party
    console.log(data)
  }

  const steps = [
    {
      component: () => (
        <RForm
          formData={rFormData}
          generalError={generalError}
          fetchRestaurants={fetchRestaurants}
        />
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
          completeVoteInfo={completeVoteInfo}
          setStep={setStep}
          voters={voters}
          setVoters={setVoters}
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
