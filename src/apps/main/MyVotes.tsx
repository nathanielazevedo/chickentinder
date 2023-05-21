import API from '../../api';
import VoteResults from './VoteResults';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import CreateLoad from '../../components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPartiesFromLocal,
  getPartyFromLocal,
} from '../../utils/localStorage';

const MyVotes = () => {
  const { id } = useParams();
  const [party, setParty] = useState({} as Party);
  const [rLikes, setRLikes] = useState([] as string[]);
  const [tLikes, setTLikes] = useState<{ [key: string]: boolean }>();

  const navigate = useNavigate();

  useEffect(() => {
    const getParty = async () => {
      if (!id) return navigate('/');
      const party = await API.getParty(id);
      const partiesInLocal = getPartiesFromLocal();
      if (!partiesInLocal) navigate('/party/' + id);
      if (partiesInLocal) {
        const party = getPartyFromLocal(id);
        if (!party) navigate('/party/' + id);
        else {
          setRLikes(party.voteRestaurants);
          if (party.vote_on_time) setTLikes(party.t_likes);
          else setTLikes({});
        }
      }
      setParty(party);
    };
    getParty();
  }, [id, navigate]);

  if (!rLikes || !tLikes || !id) return <CreateLoad />;

  return (
    <VoteResults party={party} rlikes={rLikes} tLikes={Object.keys(tLikes)} />
  );
};

export default MyVotes;
