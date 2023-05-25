import { Button } from '@mui/material'
import { setSwipeDirection } from '../../state'
import { useAppDispatch } from '../../state/redux'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const BackIcon = ({ action }: { action: () => void }) => {
  const dispatch = useAppDispatch()

  return (
    <Button
      onClick={() => {
        dispatch(setSwipeDirection('right'))
        action()
      }}
      sx={styles.c}
    >
      <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
    </Button>
  )
}

export default BackIcon

const styles = {
  c: {
    borderRadius: '50%',
    minWidth: '50px',
    minHeight: '50px',
    position: 'absolute',
    top: '10px',
    left: '0px',
  },
}
