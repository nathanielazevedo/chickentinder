import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import MainButton from '../../components/MainButton'

const NavBar = ({ myPartys }: { myPartys?: boolean }) => {
  const navigate = useNavigate()
  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        overflowX: 'hidden',
        backgroundColor: '#0A0A0A',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          width: { xs: '90%', sm: '90%', lg: '1100px' },
          maxWidth: { xs: '100%', sm: '90%', lg: '1100px' },
          padding: '0 !important',
          margin: '0 !important',
          display: 'flex',
          justifyContent: 'space-between',
          '& MuiContainer-root': {
            padding: '0 !important',
            margin: '0 !important',
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Link
            to='/'
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              color='primary'
              sx={{
                fontSize: { xs: '12px', sm: '16px', lg: '20px' },
                letterSpacing: '.2rem',
                fontWeight: 300,
                cursor: 'pointer',
              }}
            >
              CHICKEN TINDER
            </Typography>
          </Link>
          {myPartys && (
            <Box>
              <MainButton
                text='My Parties'
                height='30px'
                onClick={() => navigate('/party/my-parties')}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
