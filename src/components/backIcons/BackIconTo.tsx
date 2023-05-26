import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setSwipeDirection } from '../../state'
import { useAppDispatch } from '../../state/redux'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const BackIcon = ({ to }: { to: string }) => {
  const navigate = useNavigate()
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
        width: '100%',
      }}
    >
      <Button
        onClick={() => {
          dispatch(setSwipeDirection('right'))
          navigate(to)
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
  c: {
    // borderRadius: '50%',
    // minWidth: '50px',
    // minHeight: '50px',
    // position: 'absolute',
    // top: '10px',
    // left: '0px',
  },
}
