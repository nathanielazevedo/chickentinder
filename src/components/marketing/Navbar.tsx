import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { logo_white } from '../../assets';
import { globalStyles } from '../../styles';

const NavBar = () => {
  return (
    <AppBar position='static' elevation={0}>
      <Container sx={styles.container}>
        <Toolbar disableGutters>
          <Link
            to='/'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <img src={logo_white} alt='' style={{ height: '40px' }} />
            <Typography variant='h6' noWrap sx={styles.name}>
              CHICKEN TINDER
            </Typography>
          </Link>
          <Box sx={styles.menuContainer}>
            <Link to='create'>
              <Typography>Create a Party</Typography>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

const styles = {
  container: {
    width: { xs: '100%', lg: '1200px' },
  },
  name: {
    mr: 2,
    letterSpacing: '.3rem',
    fontWeight: 400,
    fontSize: { xs: '10px', sm: '16px' },
  },
  linksContainer: {
    flexGrow: 1,
    display: { xs: 'none', lg: 'flex' },
    justifyContent: 'flex-end',
  },
  menuContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
