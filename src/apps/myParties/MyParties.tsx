import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Typography } from '@mui/material';
import CreateLoad from '../createParty/CreateLoad';
import Container from '../../components/Container';
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

  if (!myParties) return <CreateLoad />;

  return (
    <>
      <Navbar showButton={false} />
      <Container>
        <Typography variant='h3' mb='30px'>
          Parties you've viewed
        </Typography>
        <Box display='flex' flexDirection='column' gap='10px'>
          {myParties.map((party: LocalParty) => (
            <Link to={`/party/` + party._id}>
              <MainButton text={party.name} />
            </Link>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default MyParties;
