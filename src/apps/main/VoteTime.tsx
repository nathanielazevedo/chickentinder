import { Box, Card, Tooltip, Typography } from '@mui/material';
import NavBar from '../../components/Navbar';
import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { chick } from '../../assets';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

type Props = {
  hours: { [key: string]: number };
  fTV: (
    tLikes: { [key: string]: number },
    cleanObj: { [key: string]: boolean }
  ) => void;
};

type Swipe = {
  time: string;
  direction: string;
};

const VoteTime = ({ hours, fTV }: Props) => {
  const [likes, setLikes] = useState<string[]>([]);
  const [swipe, setSwipe] = useState<Swipe | undefined>(undefined);
  const [buttonsActive, setButtonsActive] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const hoursArray = Object.keys(hours);

  const getSwipe = (time: string) => {
    if (swipe?.time === time) {
      if (swipe.direction === 'left') {
        return 'cssanimation sequence fadeOutLeft';
      } else {
        return 'cssanimation sequence fadeOutRight';
      }
    } else {
      return '';
    }
  };

  if (index === hoursArray.length) {
    likes.forEach((like) => {
      hours[like] = hours[like] + 1;
    });

    const cleanObj = {} as { [key: string]: boolean };
    likes.forEach((like) => {
      cleanObj[like] = true;
    });

    fTV(hours, cleanObj);
  }

  const time = hoursArray[index];

  return (
    <Box>
      <NavBar showButton={false} />
      <Box sx={styles.container}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '350px', md: '500px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={chick}
              alt='chicken'
              width='70px'
              style={{
                marginBottom: '10px',
              }}
            />
            <Typography variant='h4'>Now let's choose a time</Typography>
          </Box>
          <Typography variant='h4'>
            {index + 1} of {hoursArray.length}
          </Typography>
        </Box>
        <Card
          elevation={3}
          className={getSwipe(time)}
          sx={{
            ...styles.restaurantContainer,
            display: 'flex',
            padding: '20px',
            border: '0.1px solid white',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h1' color='white'>
              {time}
            </Typography>
          </Box>
        </Card>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '30%',
            marginTop: '40px',
            gap: '40px',
          }}
        >
          <Tooltip title='Dislike'>
            <ThumbDownIcon
              sx={{
                fontSize: '80px',
                cursor: 'pointer',
                border: '3px solid red',
                borderRadius: '50%',
                padding: '10px',
                ':hover': {
                  backgroundColor: 'lightcoral',
                },
              }}
              color='error'
              onClick={() => {
                if (!buttonsActive) return;
                setButtonsActive(false);
                setSwipe({ time: time, direction: 'left' });

                setTimeout(() => {
                  setIndex((prevState) => prevState + 1);
                  setButtonsActive(true);
                }, 1000);
              }}
            />
          </Tooltip>
          {index !== 0 && (
            <Tooltip title='Go Back'>
              <SettingsBackupRestoreIcon
                sx={{
                  fontSize: '80px',
                  cursor: 'pointer',
                  border: '3px solid #ed6d03',
                  borderRadius: '50%',
                  padding: '10px',
                  ':hover': {
                    backgroundColor: 'orange',
                  },
                }}
                color='warning'
                onClick={() => {
                  if (!buttonsActive) return;
                  setButtonsActive(false);
                  setSwipe({ time: '123', direction: 'left' });
                  setLikes((prevState) => {
                    // remove this restaurant it it was liked
                    const newLikes = prevState.filter((time) => {
                      return time != hoursArray[index - 1];
                    });
                    return [...newLikes];
                  });
                  setIndex((prevState) => prevState - 1);
                  setButtonsActive(true);
                }}
              />
            </Tooltip>
          )}
          <Tooltip title='Like'>
            <ThumbUpIcon
              sx={{
                fontSize: '80px',
                cursor: 'pointer',
                border: '3px solid green',
                borderRadius: '50%',
                padding: '10px',
                ':hover': {
                  backgroundColor: 'lightgreen',
                },
              }}
              color='success'
              onClick={() => {
                if (!buttonsActive) return;
                setButtonsActive(false);
                setLikes((prevState) => [...prevState, time]);
                setSwipe({ time: time, direction: 'right' });
                setTimeout(() => {
                  setIndex((prevState) => prevState + 1);
                  setButtonsActive(true);
                }, 1000);
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default VoteTime;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'flex-start', md: 'center' },
    paddingTop: { xs: '40px', md: '0px' },
    alignItems: 'center',
    height: '93vh',
    width: '100vw',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  restaurantContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '400px',
    width: { xs: '350px', md: '500px' },
    borderRadius: '10px',
    backgroundColor: 'black',
  },
};