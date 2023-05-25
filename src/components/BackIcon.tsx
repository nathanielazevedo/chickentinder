import { Button } from '@mui/material'
import { setSwipeDirection } from '../state'
import { useAppDispatch, useAppSelector } from '../state/redux'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const BackIcon = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const to = useAppSelector((state) => state.nav.to)

  return (
    <Button
      onClick={() => {
        if (typeof to === 'string') {
          dispatch(setSwipeDirection('right'))
          navigate(to ?? `/party/${id}`)
        } else {
          dispatch(setSwipeDirection('right'))
          to()
        }
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
