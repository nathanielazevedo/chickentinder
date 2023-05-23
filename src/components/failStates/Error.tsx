import MainButton from '../MainButton'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const FourOFour = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box
        width='100%'
        display='flex'
        alignItems='center'
        marginBottom='30px'
        flexDirection='column'
        justifyContent='center'
      >
        <Typography variant='h1'>Yikes</Typography>
        <Typography variant='h5' mt='20px'>
          Chicken Tinder had a problem.
        </Typography>
        <Typography variant='h5'>We apologize.</Typography>
      </Box>
      <MainButton text='Go Home' onClick={() => navigate('/')} />
    </>
  )
}

export default FourOFour
