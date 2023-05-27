import React from 'react'
import SlideIn from '../../../components/SlideIn'
import MainButton from '../../../components/MainButton'
import BackIcon from '../../../components/backIcons/BackIconAction'
import { daysInitial, daysType, getLikedDaysLength } from '../CreateHelpers'
import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

type Props = {
  days: daysType
  handleDaysNext: () => void
  isChecked: (value: string) => boolean
  setStage: React.Dispatch<React.SetStateAction<number>>
  handleDays: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Days = (props: Props) => {
  const { days, setStage, handleDays, handleDaysNext, isChecked } = props
  return (
    <>
      <BackIcon action={() => setStage(0)} />
      <SlideIn>
        <Box>
          <Typography>Choose the days you want to be voted on</Typography>
          <FormControl
            sx={{
              gap: '20px',
              display: 'flex',
              marginTop: '20px',
              marginBottom: '20px',
              flexDirection: 'column',
            }}
          >
            <RadioGroup>
              <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {Object.keys(daysInitial).map((day) => (
                  <FormControlLabel
                    key={day}
                    label={day}
                    value={day}
                    sx={{
                      width: '110px',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '14px',
                      },
                    }}
                    control={
                      <Checkbox
                        checked={isChecked(day)}
                        onChange={(e) => handleDays(e)}
                      />
                    }
                  />
                ))}
              </Box>
            </RadioGroup>
          </FormControl>
          <MainButton
            text='Next'
            onClick={handleDaysNext}
            disabled={getLikedDaysLength(days) < 2}
          />
        </Box>
      </SlideIn>
    </>
  )
}

export default Days
