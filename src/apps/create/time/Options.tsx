import { Box, Typography } from '@mui/material'
import SlideIn from '../../../components/SlideIn'
import MainButton from '../../../components/MainButton'

type Props = {
  handleTimeQuestion: (time: string) => void
  timeAnswer: string
}

const Options = ({ handleTimeQuestion, timeAnswer }: Props) => {
  return (
    <SlideIn>
      <Box>
        <Typography variant='h4'>Vote on a time or day?</Typography>
        <Typography color='secondary'>
          If your trying to decide on a time and/or day, we can help with that.
        </Typography>
        <Box
          mt='20px'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <MainButton
            text='Just Time'
            onClick={() => handleTimeQuestion('Just Time')}
            selected={timeAnswer === 'Just Time'}
          />

          <MainButton
            text='Just Day'
            onClick={() => handleTimeQuestion('Just Day')}
            selected={timeAnswer === 'Just Day'}
          />
          <MainButton
            text='Time and Day'
            onClick={() => handleTimeQuestion('Time and Day')}
            selected={timeAnswer === 'Time and Day'}
          />
          <MainButton
            text='Neither'
            onClick={() => handleTimeQuestion('Neither')}
            selected={timeAnswer === 'Neither'}
          />
        </Box>
      </Box>
    </SlideIn>
  )
}

export default Options
