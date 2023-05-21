import BackIcon from './BackIcon'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Container = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ backgroundColor: 'rgb(0,0,0)' }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: { xs: '100%', sm: '500px' },
          maxHeight: { xs: '100%', sm: 'auto' },
          borderRadius: { xs: '0px', sm: '20px' },
          padding: { xs: '80px 10px', sm: '40px' },
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'auto' },
        }}
      >
        <BackIcon />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Container
