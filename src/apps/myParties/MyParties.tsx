import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loading from '../../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import MainButton from '../../components/MainButton';
import { LocalParty, getPartiesFromLocal } from '../../utils/localStorage';

const MyParties = () => {
  const navigate = useNavigate();
  const [myParties, setMyParties] = useState<LocalParty[]>();

  useEffect(() => {
    const parties = getPartiesFromLocal();
    if (!parties) navigate('/');
    else setMyParties(parties);
  }, [navigate]);

  if (!myParties) return <Loading />;

  return (
    <>
      <Typography variant='h4' mb='25px'>
        Your Parties
      </Typography>
      <Box display='flex' flexDirection='column' gap='10px'>
        {myParties.map((party: LocalParty) => (
          <Link to={`/party/` + party._id} style={{ height: '50px' }}>
            <MainButton text={party.name} />
          </Link>
        ))}
      </Box>
    </>
  );
};

export default MyParties;
