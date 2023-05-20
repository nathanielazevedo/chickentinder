import API from '../../../api';
import { Party } from '../../../models/Party';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import VoteTime from './VoteTime';
import VoteRestaurant from './VoteRestaurant';
import VoteResults from '../VoteResults';
import CreateLoad from '../../../components/Loading';

const Swipe = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [party, setParty] = useState<Party | undefined>(undefined);
  const [votingStage, setVotingStage] = useState('loading');
  const [rLikes, setRLikes] = useState<string[]>([]);
  const [tLikes, setTLikes] = useState<{ [key: string]: boolean }>({});

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
    if (party?.voteTime) {
      setRLikes(rLikes);
      setVotingStage('times');
      return;
    }
    try {
      if (!id) return;
      await API.vote(id, rLikes, null);
      const localParty = localStorage.getItem('parties');
      if (localParty) {
        const parsedParty = JSON.parse(localParty);
        const updatedParty = parsedParty.find(
          (party: Party) => party._id === id
        );
        if (updatedParty) {
          updatedParty.voteRestaurants = rLikes;
          updatedParty.voted = true;
        }
        localStorage.setItem('parties', JSON.stringify(parsedParty));
      }
      setVotingStage('complete');
    } catch {
      console.log('error');
    }
  };

  // Finish Time Vote
  const fTV = async (
    tLikes: { [key: string]: number },
    likes: { [key: string]: boolean }
  ) => {
    try {
      if (!id) return;
      await API.vote(id, rLikes, tLikes);
      setTLikes(likes);
      const localParty = localStorage.getItem('parties');
      if (localParty) {
        const parsedParty = JSON.parse(localParty);
        const updatedParty = parsedParty.find(
          (party: Party) => party._id === id
        );
        if (updatedParty) {
          updatedParty.voteTime = likes;
          updatedParty.voteRestaurants = rLikes;
          updatedParty.voted = true;
        }
        localStorage.setItem('parties', JSON.stringify(parsedParty));
      }
      setVotingStage('complete');
    } catch {
      console.log('error');
    }
  };

  if (!party || !id) return <CreateLoad />;

  if (votingStage === 'complete') {
    return (
      <VoteResults rlikes={rLikes} id={id} party={party} tLikes={tLikes} />
    );
  }

  if (votingStage === 'restaurants') {
    return <VoteRestaurant restaurants={party?.restaurants} fRV={fRV} />;
  }

  if (votingStage === 'times') {
    return <VoteTime hours={party.hours} fTV={fTV} />;
  }

  return <CreateLoad />;
};

export default Swipe;
