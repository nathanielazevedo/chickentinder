import MainButton from '../MainButton'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const FourOFour = () => {
  const navigate = useNavigate()
  return (
    <Box
      display='flex'
      height='100vh'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        gap='20px'
        width='300px'
        display='flex'
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
      >
        <Typography variant='h1'>404</Typography>
        <Typography variant='h5'>You're lost!</Typography>
        <MainButton text='Go Home' onClick={() => navigate('/')} />
      </Box>
    </Box>
  )
}

export default FourOFour
