import { Box } from '@mui/material'
import { logo_white } from '../../assets'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ myPartys }: { myPartys?: boolean }) => {
  const navigate = useNavigate()
  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'rgb(0,0,0)',
      }}
    >
      <Container sx={{ width: { xs: '100%', lg: '1200px' } }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link
            to='/'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Box width='25px'>
              <img src={logo_white} alt='' style={{ width: '100%' }} />
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                letterSpacing: '.2rem',
                cursor: 'pointer',
              }}
            >
              CHICKEN TINDER
            </Typography>
          </Link>
          {myPartys && (
            <Typography
              fontSize='15px'
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/party/my-parties')}
            >
              My Parties
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
