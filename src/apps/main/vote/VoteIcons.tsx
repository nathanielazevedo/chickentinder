import { useState } from 'react';
import { Box } from '@mui/material';
import { Swipe } from './SwipeUtils';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Restaurant } from '../../../models/Restaurant';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

type Props = {
  index: number;
  item: Restaurant | { id: string };
  items: Restaurant[] | { id: string }[];
  setSwipe: (swipe: Swipe) => void;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setLikes: React.Dispatch<React.SetStateAction<string[]>>;
};

const VoteIcons = (props: Props) => {
  const { index, item, items, setSwipe, setIndex, setLikes } = props;
  const [buttonsActive, setButtonsActive] = useState<boolean>(true);

  return (
    <Box sx={styles.container}>
      <ThumbDownIcon
        color='error'
        sx={styles.icon}
        onClick={() => {
          if (!buttonsActive) return;
          setButtonsActive(false);
          setSwipe({ id: item.id, direction: 'left' });
          setTimeout(() => {
            setIndex((prevState: number) => prevState + 1);
            setButtonsActive(true);
          }, 1000);
        }}
      />
      {index !== 0 ? (
        <SettingsBackupRestoreIcon
          color='warning'
          sx={styles.icon}
          onClick={() => {
            if (!buttonsActive) return;
            setButtonsActive(false);
            setSwipe({ id: '123', direction: 'left' });
            setLikes((prevState) => [
              ...prevState.filter((id) => id != items[index - 1].id),
            ]);
            setIndex((prevState) => prevState - 1);
            setButtonsActive(true);
          }}
        />
      ) : (
        <Box width='50px' />
      )}
      <ThumbUpIcon
        color='success'
        sx={styles.icon}
        onClick={() => {
          if (!buttonsActive) return;
          setButtonsActive(false);
          setLikes((prevState) => [...prevState, item.id]);
          setSwipe({ id: item.id, direction: 'right' });
          setTimeout(() => {
            setIndex((prevState) => prevState + 1);
            setButtonsActive(true);
          }, 1000);
        }}
      />
    </Box>
  );
};

export default VoteIcons;

const styles = {
  container: {
    gap: '40px',
    width: '30%',
    display: 'flex',
    marginTop: '40px',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '50px',
    cursor: 'pointer',
  },
};
