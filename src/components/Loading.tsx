import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box
      display='flex'
      height='50vh'
      alignItems='center'
      justifyContent='center'
    >
      <CircularProgress size={55} />
    </Box>
  )
}

export default Loading
