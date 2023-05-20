import API from '../../api';
import PartyDeleted from './PartyDeleted';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import PasswordDialog from './PasswordDialog';
import { Box, Typography } from '@mui/material';
import CreateLoad from '../../components/Loading';
import { Link, useParams } from 'react-router-dom';
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
        const newParty = { _id: id, voted: false, name: res.name };
        if (!partiesInLocal) setFirstParty(newParty);
        else {
          const party = getPartyFromLocal(id);
          if (!party) addPartyToLocal(newParty);
          else setVoted(party.voted);
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
      <PasswordDialog open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Typography variant='h3' mb='10px'>
          {party.name}
        </Typography>
        <Typography variant='h6' color='secondary'>
          You're dining within {toMiles(party.max_distance)} miles from{' '}
          {party.location}.
        </Typography>
        <Typography variant='h6' color='secondary'>
          There are {party.maxVoters} people in your party.
        </Typography>
        {party.voteTime && (
          <Typography
            variant='h6'
            color='secondary'
            sx={{
              fontWeight: 'bold',
              alignSelf: 'flex-start',
            }}
          >
            Your party is also voting on a time to meet.
          </Typography>
        )}
        <Typography variant='h6' mt='20px' color='secondary'>
          This is your partys link:
          <Typography
            variant='h6'
            sx={{
              fontSize: '12px',
              wordBreak: 'break-word',
              color: 'primary.main',
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
          marginTop: '30px',
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
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <Link
            to={voted ? `/party/${id}/myVotes` : `/party/${id}/vote`}
            style={{ width: '100%', height: '100px' }}
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
        </Box>
        <Box
          sx={{
            height: '100px',
          }}
        >
          <MainButton text='Manage Party' onClick={() => setOpen(true)} />
        </Box>
      </Box>
    </>
  );
};

export default Entry;
