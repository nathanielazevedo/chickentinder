import { Box, Button, Link, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import { Party } from '../../models/Party';
import { bg } from '../../assets';
import { globalStyles } from '../../styles';

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
          height: { xs: '100%', sm: '100%' },
          minHeight: {
            xs: 'calc(100vh - 56px)',
            sm: 'calc(100vh - 64px)',
          },
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          paddingBottom: { xs: '50px', sm: '50px' },
        }}
      >
        <Box
          sx={{
            padding: '40px',
            borderRadius: '20px',
            width: { xs: '100%', sm: '500px' },
            backgroundColor: 'white',
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
              <Button
                fullWidth
                variant='outlined'
                sx={{
                  height: '50px',
                  color: 'black',
                  border: '2px solid black',
                  backgroundImage: globalStyles.gradientBg,
                }}
              >
                <Typography>Go to party</Typography>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NewPartyDialog;
