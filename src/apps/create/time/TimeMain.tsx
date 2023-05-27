import Days from './Days'
import Hours from './Hours'
import Options from './Options'
import { useState } from 'react'
import { daysType, hoursType } from '../CreateHelpers'
import BackIcon from '../../../components/backIcons/BackIconAction'

type Props = {
  days: daysType
  hours: hoursType
  timeAnswer: string
  completeTime: (time: string) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  setDays: React.Dispatch<React.SetStateAction<daysType>>
  setHours: React.Dispatch<React.SetStateAction<hoursType>>
  setTimeAnswer: React.Dispatch<React.SetStateAction<string>>
}

const TimesQuestion = (props: Props) => {
  const [stage, setStage] = useState(0)
  const {
    days,
    hours,
    setDays,
    setStep,
    setHours,
    timeAnswer,
    completeTime,
    setTimeAnswer,
  } = props

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

  const isCheckedDays = (value: string) => days[value as keyof daysType]
  const isCheckedHours = (value: string) => hours[value as keyof hoursType]

  const handleHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setHours({ ...hours, [value]: checked })
  }

  const handleDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
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
          <Options
            timeAnswer={timeAnswer}
            handleTimeQuestion={handleTimeQuestion}
          />
        </>
      )

    case 1:
      return (
        <Days
          days={days}
          setStage={setStage}
          handleDays={handleDays}
          isChecked={isCheckedDays}
          handleDaysNext={handleDaysNext}
        />
      )
    case 2:
      return (
        <Hours
          hours={hours}
          setStage={setStage}
          timeAnswer={timeAnswer}
          handleHours={handleHours}
          isChecked={isCheckedHours}
          completeTime={completeTime}
        />
      )
    default:
      return null
  }
}

export default TimesQuestion
