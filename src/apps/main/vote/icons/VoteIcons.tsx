import UpIcon from './UpIcon'
import { useState } from 'react'
import DownIcon from './DownIcon'
import BackIcon from './BackIcon'
import { Box } from '@mui/material'
import { Swipe } from '../SwipeUtils'
import { Restaurant } from '../../../../models/Restaurant'

type Props = {
  index: number
  setSwipe: (swipe: Swipe) => void
  item: Restaurant | { id: string } | undefined
  items: Restaurant[] | { id: string }[] | undefined
  setIndex: React.Dispatch<React.SetStateAction<number>>
  setLikes: React.Dispatch<React.SetStateAction<string[]>>
}

const VoteIcons = (props: Props) => {
  const { index } = props
  const [buttonsActive, setButtonsActive] = useState<boolean>(true)

  return (
    <Box sx={styles.container}>
      <DownIcon
        {...props}
        buttonsActive={buttonsActive}
        setButtonsActive={setButtonsActive}
      />
      {index !== 0 ? (
        <BackIcon
          {...props}
          buttonsActive={buttonsActive}
          setButtonsActive={setButtonsActive}
        />
      ) : (
        <Box minWidth='50px'></Box>
      )}
      <UpIcon
        {...props}
        buttonsActive={buttonsActive}
        setButtonsActive={setButtonsActive}
      />
    </Box>
  )
}

export default VoteIcons

const styles = {
  container: {
    gap: '40px',
    width: '30%',
    display: 'flex',
    marginTop: '40px',
    justifyContent: 'center',
  },
}
