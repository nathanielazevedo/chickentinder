import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Container = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      pt={{ sm: '100px' }}
      justifyContent='center'
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: { xs: '95%', sm: '500px' },
          maxHeight: { xs: '100%', sm: 'auto' },
          borderRadius: { xs: '0px', sm: '20px' },
          padding: { xs: '70px 10px', sm: '40px' },
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'auto' },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Container
