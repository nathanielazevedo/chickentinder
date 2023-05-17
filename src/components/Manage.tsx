import { Box, Button, Card, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Results from './Results';
import NavBar from './Navbar';
import API from '../api';

const Manage = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [party, setParty] = useState<any>(undefined);
  const [result, setResult] = useState<any>(undefined);

  useEffect(() => {
    try {
      if (!id) return;
      API.getParty(id).then((res) => {
        if (res.winner) setResult(res.winner);
        setParty(res);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const endParty = async () => {
    try {
      if (!id) return;
      const res = await API.endParty(id);
      const result = party.restaurants.find((r: any) => r.id === res);
      setResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  if (result) {
    return (
      <>
        <NavBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 80px)',
          }}
        >
          {party && (
            <Box
              sx={{
                padding: '40px',
                borderRadius: '20px',
                width: { xs: '100%', sm: '600px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: '20px',
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}
              >
                And the winner is...
              </Typography>
              <Card
                elevation={3}
                key={result.id}
                sx={{
                  ...styles.restaurantContainer,
                  position: 'relative',
                  padding: '20px',
                  minHeight: '300px',
                }}
              >
                <img
                  src={result.image_url}
                  alt={result.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    position: 'absolute',
                    filter: 'brightness(40%)',
                    borderRadius: '10px',
                    right: 0,
                  }}
                />
                <Box
                  sx={{
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography variant='h5' color='white'>
                      {result.name}
                    </Typography>
                    <Typography variant='h6' color='white'>
                      {result.location?.address1}, {result.location?.city}
                    </Typography>
                    {result.price && (
                      <Typography variant='h6' color='white'>
                        Price: {result.price}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Rating
                        name='simple-controlled'
                        value={result.rating}
                        disabled
                      />
                      <Typography variant='h6' color='white'>
                        - {result.review_count} reviews
                      </Typography>
                    </Box>

                    <Typography variant='h6' color='white'>
                      {result.display_phone}
                    </Typography>
                    <a href={result.url} target='_blank'>
                      <Typography sx={styles.link} variant='h6' color='white'>
                        View on Yelp
                      </Typography>
                    </a>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '10px',
                      justifySelf: 'flex-end',
                      flexWrap: 'wrap',
                    }}
                  >
                    {result.categories.map((category: any) => {
                      return (
                        <Typography
                          key={category.alias}
                          variant='h6'
                          color='white'
                        >
                          #{category.title}
                        </Typography>
                      );
                    })}
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        </Box>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
        }}
      >
        {party && (
          <Box
            sx={{
              padding: '40px',
              borderRadius: '20px',
              width: { xs: '100%', sm: '500px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: '20px',
            }}
          >
            <Typography
              variant='h3'
              sx={{
                fontWeight: 'bold',
              }}
            >
              {party.name}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
              }}
            >
              {party.voters} / {party.maxVoters} voters have voted
            </Typography>
            <Results />
            <Button
              fullWidth
              variant='contained'
              sx={{
                heigth: '50px',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
              onClick={endParty}
            >
              End voting
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Manage;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'flex-start', md: 'center' },
    paddingTop: { xs: '40px', md: '0px' },
    alignItems: 'center',
    maxHeight: '93vh',
    height: '93vh',
    width: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    // backgroundImage: `url(${food})`,
  },
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '400px',
    width: { xs: '100%', md: '500px' },
    borderRadius: '10px',
    backgroundColor: 'black',
  },
  link: {
    textDecoration: 'underline',
    color: 'lightblue',
  },
};
