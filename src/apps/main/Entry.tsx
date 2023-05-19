import API from '../../api';
import PartyDeleted from './PartyDeleted';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import PasswordDialog from './PasswordDialog';
import { Box, Typography } from '@mui/material';
import CreateLoad from '../createParty/CreateLoad';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import MainButton from '../../components/MainButton';
import { getBaseUrl, toMiles } from '../../utils/general';
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
  setFirstParty,
} from '../../utils/localStorage';

const Entry = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [voted, setVoted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [party, setParty] = useState<Party | undefined>(undefined);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const res = await API.getParty(id);
        const partiesInLocal = haveLocalParties();
        if (!partiesInLocal) {
          setFirstParty({ _id: id, voted: false, name: res.name });
        } else {
          const party = getPartyFromLocal(id);
          if (!party) {
            addPartyToLocal({ _id: id, voted: false, name: res.name });
          } else {
            setVoted(party.voted);
          }
        }
        setParty(res);
      } catch {
        id && removePartyFromLocal(id);
        setShowDelete(true);
      }
    };

    getParty();
  }, [id]);

  if (showDelete) return <PartyDeleted />;

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
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <Typography variant='h3' mb='20px'>
            {party.name}
          </Typography>
          <Typography variant='h6'>
            You're dining within {toMiles(party.max_distance)} miles from{' '}
            {party.location}.
          </Typography>
          <Typography variant='h6'>
            There are {party.maxVoters} people in your party.
          </Typography>
          {party.voteTime && (
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start',
              }}
            >
              Your party is also voting on a time to meet.
            </Typography>
          )}
          <Typography variant='h6' mt='20px'>
            This is your partys link:
            <Typography
              color='darkblue'
              variant='h6'
              sx={{
                fontSize: '12px',
                wordBreak: 'break-word',
              }}
            >
              {getBaseUrl() + 'party/' + party._id}
            </Typography>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            marginTop: '50px',
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
            style={{ width: '100%' }}
          >
            <MainButton
              text={voted ? 'View My Votes' : 'Vote'}
              onClick={() => console.log('hello')}
            />
          </Link>
          <Link to={`/party/${id}/results`} style={{ width: '100%' }}>
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
