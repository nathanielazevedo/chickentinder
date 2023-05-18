import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PasswordDialog from './PasswordDialog';
import Navbar from '../../components/Navbar';
import API from '../../api';
import { chick } from '../../assets';
import { Party } from '../../models/Party';

const localUrl = 'http://localhost:5173/chickentinder/';
const prodUrl = 'https://nathanielazevedo.github.io/chickentinder/';
const baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl;

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [party, setParty] = useState({} as Party);
  const partyInLocal = localStorage.getItem('parties');

  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      const res = await API.getParty(id);
      if (!partyInLocal) {
        localStorage.setItem(
          'parties',
          JSON.stringify([{ _id: id, voted: false, name: res.name }])
        );
      }
      if (partyInLocal) {
        const partys = JSON.parse(partyInLocal);
        const party = partys.find((party: Party) => party._id === id);
        if (!party) {
          localStorage.setItem(
            'parties',
            JSON.stringify([
              ...partys,
              { _id: id, voted: false, name: res.name },
            ])
          );
        }
      }
      setParty(res);
    };
    getParty();
  }, [id, partyInLocal]);

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
        }}
      >
        <Box
          sx={{
            height: '500px',
            width: '500px',
            position: 'absolute',
            bottom: '0',
            right: '0',
          }}
        ></Box>
        <PasswordDialog open={open} setOpen={setOpen} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            borderRadius: '20px',
            width: { xs: '100%', sm: '500px' },
            gap: '50px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginBottom: '20px',
              }}
            >
              Party Name: {party.name}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
              }}
            >
              You're dining within {toMiles(party.max_distance)} miles from{' '}
              {party.location}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
              }}
            >
              There are {party.maxVoters} people in your party
            </Typography>
            {party.voteTime && (
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}
              >
                Your party will also be voting on a time to meet.
              </Typography>
            )}
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginTop: '20px',
                wordBreak: 'break-word',
              }}
            >
              This is your partys link:
              <Typography color='darkblue'>
                {baseUrl + 'party/' + party._id}
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img src={chick} alt='chick' width='70px' />
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                What would you like to do?
              </Typography>
            </Box>
            <Link
              to={party.winner ? `/party/${id}/` : `/party/${id}/vote`}
              style={{
                width: '100%',
              }}
            >
              <Button
                variant='outlined'
                fullWidth
                disabled={party.winner ? true : false}
                sx={{
                  height: '50px',
                }}
              >
                <Typography>
                  {party.winner ? 'Winner Chosen' : 'Vote'}
                </Typography>
              </Button>
            </Link>
            <Link
              to={`/party/${id}/results`}
              style={{
                width: '100%',
              }}
            >
              <Button
                variant='outlined'
                fullWidth
                sx={{
                  height: '50px',
                }}
              >
                <Typography>View Results</Typography>
              </Button>
            </Link>
            <Button
              variant='outlined'
              fullWidth
              onClick={() => setOpen(true)}
              sx={{
                height: '50px',
              }}
            >
              <Typography>Manage Party</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Entry;
