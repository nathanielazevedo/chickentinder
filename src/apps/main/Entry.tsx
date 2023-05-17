import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PasswordDialog from './PasswordDialog';
import Navbar from '../../components/NavBar';
import API from '../../api';
import { chick } from '../../assets';

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [party, setParty] = useState({} as any);

  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      const res = await API.getParty(id);
      setParty(res);
    };
    getParty();
  }, [id]);

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
            gap: '100px',
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
              Welcome to {party.name}
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
                variant='contained'
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
                variant='contained'
                fullWidth
                sx={{
                  height: '50px',
                }}
              >
                <Typography>View Results</Typography>
              </Button>
            </Link>
            <Button
              variant='contained'
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
