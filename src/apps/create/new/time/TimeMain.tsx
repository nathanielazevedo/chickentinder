import Days from './Days'
import Hours from './Hours'
import Options from './Options'
import { useState } from 'react'
import { daysType, hoursType } from '../CreateHelpers'
import BackIcon from '../../../../components/backIcons/BackIconAction'

type Props = {
  days: daysType
  hours: hoursType
  completeTime: (time: string) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  setDays: React.Dispatch<React.SetStateAction<daysType>>
  setHours: React.Dispatch<React.SetStateAction<hoursType>>
}

const TimesQuestion = ({
  completeTime,
  setStep,
  days,
  hours,
  setDays,
  setHours,
}: Props) => {
  const [timeAnswer, setTimeAnswer] = useState('')
  const [timeError, setTimeError] = useState(false)
  const [dayError, setDayError] = useState(false)
  const [stage, setStage] = useState(0)

  const handleTimeQuestion = (answer: string) => {
    setTimeAnswer(answer)
    switch (answer) {
      case 'Just Day':
        setStage(1)
        break
      case 'Just Time':
        setStage(2)
        break
      case 'Time and Day':
        setStage(1)
        break
      case 'Neither':
        completeTime(timeAnswer)
        break
      default:
        break
    }
  }

  const isCheckedHours = (value: string) => hours[value as keyof hoursType]
  const isCheckedDays = (value: string) => days[value as keyof daysType]

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setTimeError(false)
    setHours({ ...hours, [value]: checked })
  }

  const handleDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setDayError(false)
    setDays({ ...days, [value]: checked })
  }

  const handleDaysNext = () => {
    if (timeAnswer === 'Just Day') {
      completeTime(timeAnswer)
    } else {
      setStage(2)
    }
  }

  switch (stage) {
    case 0:
      return (
        <>
          <BackIcon action={() => setStep(1)} />
          <Options handleTimeQuestion={handleTimeQuestion} />
        </>
      )

    case 1:
      return (
        <Days
          completeTime={completeTime}
          setStage={setStage}
          handleDays={handleDays}
          handleDaysNext={handleDaysNext}
          isChecked={isCheckedDays}
        />
      )
    case 2:
      return (
        <Hours
          completeTime={completeTime}
          handleHours={handleHours}
          isChecked={isCheckedHours}
          timeAnswer={timeAnswer}
          setStage={setStage}
        />
      )
    default:
      return null
  }
}

export default TimesQuestion
