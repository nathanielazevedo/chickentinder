import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { bg } from '../../assets';

const MyParties = () => {
  const [myParties, setMyParties] = useState([]);

  useEffect(() => {
    const parties = JSON.parse(localStorage.getItem('parties') || '[]');
    setMyParties(parties);
  }, []);

  return (
    <>
      <Navbar showButton={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
        }}
      >
        <Card
          sx={{
            marginTop: '50px',
            backgroundColor: '#ffffff',
            padding: { xs: '40px 15px', sm: '40px' },
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
        </Card>
      </Box>
    </>
  );
};

export default MyParties;
