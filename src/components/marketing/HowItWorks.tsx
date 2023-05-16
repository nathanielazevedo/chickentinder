import { Link } from 'react-router-dom';
import { logo_white } from '../../assets';
import { constants } from '../../constants';
import { Box, Button, Card, Typography } from '@mui/material';

const SectionTwo = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          maxWidth: { xs: '90%', sm: '90%', md: '1100px' },
          width: { xs: '100%', sm: '100%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', lg: 'space-between' },
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <Box
            sx={{
              width: '550px',
            }}
          >
            <Typography variant='h2' mb={0.5} sx={{ fontWeight: 'bold' }}>
              How It Works
            </Typography>
            <Typography>
              Choose a location and a max distance from that location. We'll
              fetch all the restaurants in that area and generate a unique link
              which you can send to your friends. Swipe right on the restaurants
              you like and left on the ones you don't. Once everyone has swiped,
              or the party creator ends the voting, you will be shown the
              winner.
            </Typography>
            <Link to='create'>
              <Button
                variant='contained'
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                  height: '50px',
                  marginTop: '20px',
                }}
              >
                <Typography>Create a Party</Typography>
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <img
              src={logo_white}
              alt=''
              style={{
                width: '300px',
                marginRight: '70px',
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: { lg: '320px' },
            gap: '50px',
            marginTop: '100px',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {constants.marketingCards.map((card, i) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  width: { xs: '100%', lg: '800px' },
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    left: '-20px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                    color: 'white',
                    background: '#a82720',
                  }}
                >
                  <Typography variant='h4'>{i + 1}</Typography>
                </div>
                <Card
                  sx={{
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '290px',
                    maxHeight: '290px',
                    marginTop: '20px',
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 'bold',
                      marginBottom: '10px',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '150px',
                    }}
                  >
                    <img src={card.icon} width='80px' />
                  </Box>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SectionTwo;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: { xs: '150px 0', lg: '100px' },
  },
};
