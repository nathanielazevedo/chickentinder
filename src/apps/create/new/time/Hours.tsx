import React, { useEffect } from 'react'
import { setSwipeTo } from '../../../../state'
import { hoursInitial } from '../CreateHelpers'
import SlideIn from '../../../../components/SlideIn'
import { useAppDispatch } from '../../../../state/redux'
import MainButton from '../../../../components/MainButton'
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

type Props = {
  timeAnswer: string
  completeTime: (time: string) => void
  isChecked: (value: string) => boolean
  setStage: React.Dispatch<React.SetStateAction<number>>
  handleHours: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Hours = ({
  completeTime,
  handleHours,
  isChecked,
  timeAnswer,
  setStage,
}: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (timeAnswer === 'Just Time') {
      dispatch(setSwipeTo(() => setStage(0)))
    } else {
      dispatch(setSwipeTo(() => setStage(1)))
    }
  }, [dispatch, setStage, timeAnswer])

  return (
    <SlideIn>
      <Box>
        <Typography>Choose the time ranges you want to be voted on</Typography>
        <FormControl>
          <RadioGroup>
            <Box display='flex' flexWrap='wrap' justifyContent='center'>
              {Object.keys(hoursInitial).map((hour) => (
                <FormControlLabel
                  key={hour}
                  label={hour}
                  value={hour}
                  sx={{
                    width: '100px',
                    '& .MuiFormControlLabel-label': {
                      fontSize: '12px',
                    },
                  }}
                  control={
                    <Checkbox
                      checked={isChecked(hour)}
                      onChange={(e) => handleHours(e)}
                    />
                  }
                />
              ))}
            </Box>
          </RadioGroup>
        </FormControl>
        <MainButton text='Finish' onClick={() => completeTime(timeAnswer)} />
      </Box>
    </SlideIn>
  )
}

export default Hours
