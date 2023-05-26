import { Box, Button } from '@mui/material'
import { setSwipeDirection } from '../../state'
import { useAppDispatch } from '../../state/redux'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const BackIcon = ({ action }: { action: () => void }) => {
  const dispatch = useAppDispatch()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        position: 'absolute',
        top: '10px',
        left: '0px',
        width: '100vw',
      }}
    >
      <Button
        onClick={() => {
          dispatch(setSwipeDirection('right'))
          action()
        }}
        sx={styles.c}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
      </Button>
    </Box>
  )
}

export default BackIcon

const styles = {
  c: {},
}
