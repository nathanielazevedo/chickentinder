import SlideIn from '../../../../components/SlideIn'
import { Box, Typography } from '@mui/material'
import MainButton from '../../../../components/MainButton'

type Props = {
  handleTimeQuestion: (time: string) => void
}

const Options = ({ handleTimeQuestion }: Props) => {
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
          />

          <MainButton
            text='Just Day'
            onClick={() => handleTimeQuestion('Just Day')}
          />
          <MainButton
            text='Time and Day'
            onClick={() => handleTimeQuestion('Time and Day')}
          />
          <MainButton
            text='Neither'
            onClick={() => handleTimeQuestion('Neither')}
          />
        </Box>
      </Box>
    </SlideIn>
  )
}

export default Options
