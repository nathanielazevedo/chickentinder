import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setSwipeDirection } from '../../state'
import { useAppDispatch } from '../../state/redux'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const BackIcon = ({ to }: { to: string }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <Button
      onClick={() => {
        dispatch(setSwipeDirection('right'))
        navigate(to)
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
