import React from 'react'
import SlideIn from '../../../components/SlideIn'
import MainButton from '../../../components/MainButton'
import BackIcon from '../../../components/backIcons/BackIconAction'
import { getLikedLength, hoursInitial, hoursType } from '../CreateHelpers'
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

type Props = {
  hours: hoursType
  timeAnswer: string
  completeTime: (time: string) => void
  isChecked: (value: string) => boolean
  setStage: React.Dispatch<React.SetStateAction<number>>
  handleHours: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Hours = (props: Props) => {
  const { hours, completeTime, timeAnswer, isChecked, setStage, handleHours } =
    props

  const backAction = () => {
    if (timeAnswer === 'Just Time') {
      setStage(0)
    } else if (timeAnswer === 'Time and Day') {
      setStage(1)
    }
  }

  return (
    <>
      <BackIcon action={backAction} />
      <SlideIn>
        <Box>
          <Typography variant='h5' mb='10px'>
            Choose the time ranges you want to be voted on
          </Typography>
          <FormControl sx={{ marginBottom: '20px' }}>
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
          <MainButton
            disabled={getLikedLength(hours) < 2}
            text='Next'
            onClick={() => completeTime(timeAnswer)}
          />
        </Box>
      </SlideIn>
    </>
  )
}

export default Hours
