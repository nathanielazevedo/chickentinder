import { routes } from '../router'
import playSound from '../utils/playSound'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Button } from '@mui/material'
import {
  useNavigate,
  useLocation,
  matchRoutes,
  useParams,
} from 'react-router-dom'

const BackIcon = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  let currPath = undefined
  const route = matchRoutes(routes, location)
  if (route && route.length > 0)
    currPath = route.find((m) => m.pathname === location.pathname)?.route.path

  let to = ''
  switch (currPath) {
    case 'create':
      to = '/'
      break
    case ':id':
      to = '/party/my-parties'
      break
    case ':id/vote':
      to = `/party/${id}`
      break
    case ':id/myVotes':
      to = `/party/${id}`
      break
    case ':id/results':
      to = `/party/${id}`
      break
    case ':id/manage':
      to = `/party/${id}`
      break
    case 'my-parties':
      to = `/`
      break
    default:
      to = `/`
  }

  return (
    <Button
      onClick={() => {
        playSound('good')
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
