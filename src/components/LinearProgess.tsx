import {
  Box,
  Typography,
  LinearProgress,
  LinearProgressProps,
} from '@mui/material'

type Props = LinearProgressProps & {
  value: number
  realValue?: number
}

const LinearProgess = ({ realValue, ...props }: Props) => (
  <Box display='flex' alignItems='center'>
    <Box width='100%' mr={1}>
      <LinearProgress variant='determinate' {...props} />
    </Box>
    <Box minWidth={35}>
      <Typography variant='body2' color='text.secondary'>
        {realValue}
      </Typography>
    </Box>
  </Box>
)

export default LinearProgess
