import API from '../../api';
import VoteResults from './VoteResults';
import { Party } from '../../models/Party';
import { useEffect, useState } from 'react';
import CreateLoad from '../createParty/CreateLoad';
import { useNavigate, useParams } from 'react-router-dom';

const MyVotes = () => {
  const { id } = useParams();
  const partiesInLocal = localStorage.getItem('parties');
  const [party, setParty] = useState({} as Party);
  const [rLikes, setRLikes] = useState([] as string[]);
  const [tLikes, setTLikes] = useState<{ [key: string]: boolean }>();

  const navigate = useNavigate();

  useEffect(() => {
    const getParty = async () => {
      if (!id) return navigate('/');
      const res = await API.getParty(id);
      if (!partiesInLocal) navigate('/party/' + id);

      if (partiesInLocal) {
        const partys = JSON.parse(partiesInLocal);
        const party = partys.find((party: Party) => party._id === id);
        if (!party) {
          navigate('/party/' + id);
        } else {
          setRLikes(party.voteRestaurants);
          if (party.voteTime) {
            setTLikes(party.voteTime);
          } else {
            setTLikes({});
          }
        }
      }
      setParty(res);
    };
    getParty();
  }, [id, navigate, partiesInLocal]);

  if (!rLikes || !tLikes || !id) return <CreateLoad />;

  return <VoteResults party={party} rlikes={rLikes} tLikes={tLikes} id={id} />;
};

export default MyVotes;
