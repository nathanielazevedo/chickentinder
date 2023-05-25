import {
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import React from 'react'
import MainButton from '../../../../components/MainButton'
import SlideIn from '../../../../components/SlideIn'
import { daysInitial, daysType, getLikedDaysLength } from '../CreateHelpers'
import BackIcon from '../../../../components/backIcons/BackIconAction'

type Props = {
  days: daysType
  setStage: React.Dispatch<React.SetStateAction<number>>
  handleDays: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDaysNext: () => void
  isChecked: (value: string) => boolean
}

const Days = (props: Props) => {
  const { days, setStage, handleDays, handleDaysNext, isChecked } = props
  return (
    <>
      <BackIcon action={() => setStage(0)} />
      <SlideIn>
        <Box>
          <Typography>Choose the days you want to be voted on</Typography>
          <FormControl>
            <RadioGroup>
              <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {Object.keys(daysInitial).map((day) => (
                  <FormControlLabel
                    key={day}
                    label={day}
                    value={day}
                    sx={{
                      width: '120px',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '12px',
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
