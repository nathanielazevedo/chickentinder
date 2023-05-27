import { Box, Typography } from '@mui/material'
import SlideIn from '../../../components/SlideIn'
import MainButton from '../../../components/MainButton'

type Props = {
  timeAnswer: string
  handleTimeQuestion: (time: string) => void
}

const Options = ({ handleTimeQuestion, timeAnswer }: Props) => {
  return (
    <SlideIn>
      <Box mt='50px'>
        <Typography variant='h4'>Vote on a time or day?</Typography>
        <Typography color='secondary'>
          If your trying to decide on a time and/or day, we can help with that.
        </Typography>
        <Box
          mt='20px'
          sx={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              flex: '30%',
              width: '100%',
            }}
          >
            <MainButton
              text='Just Time'
              onClick={() => handleTimeQuestion('Just Time')}
              selected={timeAnswer === 'Just Time'}
            />
          </Box>

          <Box
            sx={{
              flex: '30%',
              width: '100%',
            }}
          >
            <MainButton
              text='Just Day'
              onClick={() => handleTimeQuestion('Just Day')}
              selected={timeAnswer === 'Just Day'}
            />
          </Box>
          <Box
            sx={{
              flex: '30%',
              width: '100%',
            }}
          >
            <MainButton
              text='Time and Day'
              onClick={() => handleTimeQuestion('Time and Day')}
              selected={timeAnswer === 'Time and Day'}
            />
          </Box>
          <Box
            sx={{
              flex: '30%',
              width: '100%',
            }}
          >
            <MainButton
              text='Neither'
              onClick={() => handleTimeQuestion('Neither')}
              selected={timeAnswer === 'Neither'}
            />
          </Box>
        </Box>
      </Box>
    </SlideIn>
  )
}

export default Options
