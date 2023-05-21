import { Party } from '../../models/Party';
import { getBaseUrl } from '../../utils/general';
import MainButton from '../../components/MainButton';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export interface NewPartyDialog {
  party: Party;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <>
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
          }}
        >
          <Typography color='secondary.main'>
            Send this link to your friends!
          </Typography>
          <Typography color='error' fontWeight='bold'>
            Don't lose it!
          </Typography>
        </Box>
        <Link to={'/party/' + party._id}>
          <Typography
            sx={{
              wordBreak: 'break-all',
              marginBottom: '20px',
            }}
          >
            {getBaseUrl() + 'party/' + party._id}
          </Typography>
        </Link>
        <Link
          to={'/party/' + party._id}
          style={{
            position: 'absolute',
            top: '20px',
            right: '10px',
            textDecoration: 'none',
          }}
        >
          <MainButton text='Go to party' />
        </Link>
      </Box>
    </>
  );
};

export default NewPartyDialog;
