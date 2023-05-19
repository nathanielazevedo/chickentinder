import { Party } from '../../models/Party';
import Navbar from '../../components/Navbar';
import { getBaseUrl } from '../../utils/general';
import Container from '../../components/Container';
import MainButton from '../../components/MainButton';
import { Box, Link, Typography } from '@mui/material';

export interface NewPartyDialog {
  party: Party;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <>
      <Navbar showButton={false} />
      <Container>
        <Typography variant='h2'>Let the swiping begin!</Typography>
        <Box mt='20px'>
          <Typography>
            Your party has been created! You can now start swiping.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              marginBottom: '10px',
            }}
          >
            <Typography>Send this link to your friends!</Typography>
            <Typography color='error' fontWeight='bold'>
              Don't lose it!
            </Typography>
          </Box>
          <Link href={getBaseUrl() + 'party/' + party._id} target='_blank'>
            <Typography
              sx={{
                wordBreak: 'break-all',
                marginBottom: '20px',
              }}
            >
              {getBaseUrl() + 'party/' + party._id}
            </Typography>
          </Link>
          <Link href={getBaseUrl() + 'party/' + party._id} target='_blank'>
            <MainButton text='Go to party' />
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default NewPartyDialog;
