import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logo_white } from '../assets';

function ResponsiveAppBar({ showButton = true }: { showButton?: boolean }) {
  const navigate = useNavigate();
  return (
    <AppBar position='static' elevation={0}>
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
            <img src={logo_white} alt='' style={{ height: '40px' }} />
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                fontWeight: 400,
                fontSize: { xs: '10px', sm: '16px' },
                letterSpacing: '.3rem',
                cursor: 'pointer',
              }}
            >
              CHICKEN TINDER
            </Typography>
          </Link>
          {showButton && (
            <Typography
              fontSize='15px'
              color='white'
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Go Back
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
