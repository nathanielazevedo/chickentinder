import { Party } from '../../models/Party';
import { getBaseUrl } from '../../utils/general';
import Container from '../../components/Container';
import MainButton from '../../components/MainButton';
import { Box, Link, Typography } from '@mui/material';

export interface NewPartyDialog {
  party: Party;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <Container>
      <Typography variant='h3'>Let the swiping begin!</Typography>
      <Box mt='10px'>
        <Typography color='secondary.main'>
          Your party has been created!
        </Typography>
        <Typography color='secondary.main'>
          You can now start swiping.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <Typography color='secondary.main'>
            Send this link to your friends!
          </Typography>
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
  );
};

export default NewPartyDialog;
