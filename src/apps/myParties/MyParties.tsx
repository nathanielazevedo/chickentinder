import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MyParties = () => {
  const [myParties, setMyParties] = useState([]);

  useEffect(() => {
    const parties = JSON.parse(localStorage.getItem('parties') || '[]');
    setMyParties(parties);
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginTop: '50px',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              marginBottom: '30px',
            }}
          >
            Parties you've viewed
          </Typography>
          {myParties.map((party: any) => {
            return (
              <Link to={`/party/` + party._id}>
                <Button
                  variant='outlined'
                  key={party._id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '10px',
                    width: '300px',
                  }}
                >
                  <Typography>{party.name}</Typography>
                </Button>
              </Link>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default MyParties;
