import API from '../../../api';
import VoteTime from './VoteTime';
import VoteResults from '../VoteResults';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VoteRestaurant from './VoteRestaurant';
import { Party } from '../../../models/Party';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import {
  addPartyToLocal,
  getPartyFromLocal,
  updatePartyInLocal,
} from '../../../utils/localStorage';

const Swipe = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [rLikes, setRLikes] = useState<string[]>([]);
  const [tLikes, setTLikes] = useState<string[]>([]);
  const [votingStage, setVotingStage] = useState('loading');
  const [party, setParty] = useState<Party | undefined>(undefined);

  // Get Party
  useEffect(() => {
    const getParty = async () => {
      if (!id) return;
      try {
        const party = await API.getParty(id);
        setParty(party);
        setVotingStage('restaurants');
      } catch {
        console.log('error');
      }
    };

    getParty();
  }, [id, navigate]);

  // Finish Restaurant Vote
  const fRV = async (rLikes: string[]) => {
    if (party?.vote_on_time) {
      setRLikes(rLikes);
      setVotingStage('times');
      return;
    }
    try {
      if (!id) return;
      await API.vote(id, rLikes, null);

      const party = getPartyFromLocal(id);
      if (party) {
        party.voteRestaurants = rLikes;
        party.voted = true;
        updatePartyInLocal(party);
      } else addPartyToLocal(party);

      setVotingStage('complete');
    } catch {
      console.log('error');
    }
  };

  // Finish Time Vote
  const fTV = async (likes: string[]) => {
    try {
      if (!id) return;
      await API.vote(id, rLikes, likes);
      setTLikes(likes);

      const party = getPartyFromLocal(id);
      if (party) {
        party.voteTime = likes;
        party.voteRestaurants = rLikes;
        party.voted = true;
        updatePartyInLocal(party);
      } else addPartyToLocal(party);

      setVotingStage('complete');
    } catch {
      console.log('error');
    }
  };

  if (!party || !id) return <Loading />;

  switch (votingStage) {
    case 'loading':
      return <Loading />;
    case 'restaurants':
      return <VoteRestaurant restaurants={party?.restaurants} fRV={fRV} />;
    case 'times':
      return <VoteTime times_to_vote_on={party.times_to_vote_on} fTV={fTV} />;
    case 'complete':
      return <VoteResults party={party} rlikes={rLikes} tLikes={tLikes} />;
    default:
      return <Loading />;
  }
};

export default Swipe;
