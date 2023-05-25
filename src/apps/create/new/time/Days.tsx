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
import { daysInitial } from '../CreateHelpers'

type Props = {
  completeTime: (time: string) => void
  setStage: React.Dispatch<React.SetStateAction<number>>
  handleDays: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDaysNext: () => void
  isChecked: (value: string) => boolean
}

const Days = ({
  completeTime,
  setStage,
  handleDays,
  handleDaysNext,
  isChecked,
}: Props) => {
  return (
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
        <MainButton text='Next' onClick={handleDaysNext} />
      </Box>
    </SlideIn>
  )
}

export default Days
