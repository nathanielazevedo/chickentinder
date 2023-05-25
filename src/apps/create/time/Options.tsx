import SlideIn from '../../../components/SlideIn'
import { Box, Typography } from '@mui/material'
import MainButton from '../../../components/MainButton'
import { Check } from '@mui/icons-material'

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
            icon={
              timeAnswer === 'Just Time' ? <Check color='success' /> : undefined
            }
          />

          <MainButton
            text='Just Day'
            onClick={() => handleTimeQuestion('Just Day')}
            icon={
              timeAnswer === 'Just Day' ? <Check color='success' /> : undefined
            }
          />
          <MainButton
            text='Time and Day'
            onClick={() => handleTimeQuestion('Time and Day')}
            icon={
              timeAnswer === 'Time and Day' ? (
                <Check color='success' />
              ) : undefined
            }
          />
          <MainButton
            text='Neither'
            onClick={() => handleTimeQuestion('Neither')}
            icon={
              timeAnswer === 'Neither' ? <Check color='success' /> : undefined
            }
          />
        </Box>
      </Box>
    </SlideIn>
  )
}

export default Options
