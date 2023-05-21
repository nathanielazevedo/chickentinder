import API from '../../api';
import PartyDeleted from './PartyDeleted';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import PasswordDialog from './PasswordDialog';
import { Box, Typography } from '@mui/material';
import Loading from '../../components/Loading';
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
  const [party, setParty] = useState<Party>();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const res = await API.getParty(id);
        const newParty = { _id: id, voted: false, name: res.name };
        const partiesInLocal = haveLocalParties();
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

  if (!party) return <Loading />;

  return (
    <>
      <PasswordDialog open={open} setOpen={setOpen} />
      <Box mb='30px'>
        <Typography variant='h3' mb='10px'>
          {party.name}
        </Typography>
        <Typography color='secondary'>
          You're dining within {toMiles(party.max_distance)} miles from{' '}
          {party.location}.
        </Typography>
        <Typography color='secondary'>
          There are {party.max_voters} people in your party.
        </Typography>
        {party.vote_on_time && (
          <Typography color='secondary' alignSelf='flex-start'>
            Your party is also voting on a time to meet.
          </Typography>
        )}
        <Typography mt='20px' color='secondary'>
          This is your partys link:
          <Typography
            fontSize='12px'
            color='primary.main'
            sx={{ wordBreak: 'break-word' }}
          >
            {getBaseUrl() + 'party/' + party._id}
          </Typography>
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' gap='20px' width='100%'>
        <Typography variant='h4' fontWeight='bold'>
          What would you like to do?
        </Typography>
        <Box display='flex' gap='20px'>
          <Link
            to={voted ? `/party/${id}/myVotes` : `/party/${id}/vote`}
            style={{ width: '100%', height: '100px' }}
          >
            <MainButton text={voted ? 'View My Votes' : 'Vote'} />
          </Link>
          <Link to={`/party/${id}/results`} style={{ width: '100%' }}>
            <MainButton text='View Results' />
          </Link>
        </Box>
        <Box sx={{ height: '100px' }}>
          <MainButton text='Manage Party' onClick={() => setOpen(true)} />
        </Box>
      </Box>
    </>
  );
};

export default Entry;
