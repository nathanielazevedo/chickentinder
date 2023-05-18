import { Box, Link, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import { Party } from '../../models/Party';
import Button from '../../components/Button';

const localUrl = 'http://localhost:5173/chickentinder/';
const prodUrl = 'https://nathanielazevedo.github.io/chickentinder/';
const baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl;
export interface NewPartyDialog {
  party: Party;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 70px)',
        }}
      >
        <Box
          sx={{
            padding: '40px',
            borderRadius: '20px',
            width: { xs: '100%', sm: '500px' },
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontWeight: 'bold',
            }}
          >
            Let the swiping begin!
          </Typography>
          <Typography>
            Your party has been created! You can now start swiping.
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
            }}
          >
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
            <Link href={baseUrl + 'party/' + party._id} target='_blank'>
              <Typography
                sx={{
                  wordBreak: 'break-all',
                  marginBottom: '20px',
                }}
              >
                {baseUrl + 'party/' + party._id}
              </Typography>
            </Link>
            <Link href={baseUrl + 'party/' + party._id} target='_blank'>
              <Button text={'Start Swiping'} />
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewPartyDialog;
