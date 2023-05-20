import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logo_white } from '../../assets';
import { Box } from '@mui/material';

const NavBar = ({
  showButton = true,
  myPartys,
}: {
  showButton?: boolean;
  myPartys?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        maxWidth: '100vw',
        overflowX: 'hidden',
        maxHeight: '56ox !important',
        backgroundColor: 'rgb(0,0,0, 0.7)',
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
              variant='h6'
              sx={{
                fontWeight: 400,
                fontSize: '10px',
                letterSpacing: '.2rem',
                cursor: 'pointer',
              }}
            >
              CHICKEN TINDER
            </Typography>
          </Link>
          {showButton && !myPartys && (
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
          {myPartys && (
            <Typography
              fontSize='15px'
              color='white'
              sx={{
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/party/my-parties');
              }}
            >
              My Parties
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
