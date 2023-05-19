import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PasswordDialog from './PasswordDialog';
import Navbar from '../../components/Navbar';
import API from '../../api';
import { Party } from '../../models/Party';
import CreateLoad from '../createParty/CreateLoad';
import Container from '../../components/Container';
import MainButton from '../../components/MainButton';

const localUrl = 'http://localhost:5173/chickentinder/';
const prodUrl = 'https://nathanielazevedo.github.io/chickentinder/';
const baseUrl = process.env.NODE_ENV === 'development' ? localUrl : prodUrl;

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [party, setParty] = useState<Party | undefined>(undefined);
  const [voted, setVoted] = useState(false);
  const partiesInLocal = localStorage.getItem('parties');

  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      const res = await API.getParty(id);
      if (!partiesInLocal) {
        localStorage.setItem(
          'parties',
          JSON.stringify([{ _id: id, voted: false, name: res.name }])
        );
      }
      if (partiesInLocal) {
        const partys = JSON.parse(partiesInLocal);
        const party = partys.find((party: Party) => party._id === id);
        if (!party) {
          localStorage.setItem(
            'parties',
            JSON.stringify([
              ...partys,
              { _id: id, voted: false, name: res.name },
            ])
          );
        } else {
          setVoted(party.voted);
        }
      }
      setParty(res);
    };
    getParty();
  }, [id, partiesInLocal]);

  const toMiles = (km: number) => {
    const miles = km / 1609.34;
    return Math.floor(miles);
  };

  if (!party) return <CreateLoad />;

  return (
    <>
      <Navbar showButton={false} />
      <PasswordDialog open={open} setOpen={setOpen} />
      <Container>
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
            {party.name}
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
            <Typography variant='h4' fontWeight='bold'>
              What would you like to do?
            </Typography>
          </Box>
          <Link
            to={voted ? `/party/${id}/myVotes` : `/party/${id}/vote`}
            style={{
              width: '100%',
            }}
          >
            <MainButton
              text={voted ? 'View My Votes' : 'Vote'}
              onClick={() => console.log('hello')}
            />
          </Link>
          <Link
            to={`/party/${id}/results`}
            style={{
              width: '100%',
            }}
          >
            <MainButton
              text='View Results'
              onClick={() => console.log('hello')}
            />
          </Link>
          <MainButton text='Manage Party' onClick={() => setOpen(true)} />
        </Box>
      </Container>
    </>
  );
};

export default Entry;
