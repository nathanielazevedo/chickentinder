import { Box, Link, Typography } from '@mui/material';
// import baseUrl from "../api.js";
const localUrl = 'http://localhost:5173/chickentinder/';
const prodUrl = 'https://nathanielazevedo.github.io/chickentinder/';

const baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl;

export interface NewPartyDialog {
  party: any;
}

const NewPartyDialog = ({ party }: NewPartyDialog) => {
  return (
    <>
      <Typography
        variant='h3'
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
            }}
          >
            {baseUrl + 'party/' + party._id}
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default NewPartyDialog;
