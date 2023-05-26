import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import MainButton from '../../components/MainButton'

const CookieConsent = () => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        height: '15vh',
        backgroundColor: 'rgb(0, 53, 63, 95%)',
        display: open ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        borderRadius: '20px 0 0 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: { xs: '98%', sm: '90%' },
          height: '50%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <Typography variant='h4'>CookieConsent</Typography>
          <Typography color='secondary'>
            We eat none of your cookies. Just wanted to let you know that.
          </Typography>
        </Box>
        <Box>
          <MainButton text='Thanks!' onClick={() => setOpen(false)} />
        </Box>
      </Box>
    </Box>
  )
}

export default CookieConsent
