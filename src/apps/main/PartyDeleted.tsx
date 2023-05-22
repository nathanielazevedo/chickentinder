import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'

const PartyDeleted = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box
        mb='20px'
        display='flex'
        alignItems='center'
        flexDirection='column'
        justifyContent='center'
      >
        <Typography variant='h3'>Sorry!</Typography>
        <Typography variant='h5'>This party has been removed.</Typography>
      </Box>
      <MainButton
        text='Go Home'
        onClick={() => navigate('/party/my-parties')}
      />
    </>
  )
}

export default PartyDeleted
