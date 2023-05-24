import { routes } from '../router'
import { Button } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  useNavigate,
  useLocation,
  matchRoutes,
  useParams,
} from 'react-router-dom'
import { useAppDispatch } from '../state/redux'
import { setSwipeDirection } from '../state'

type Props = {
  customRoute?: string
  customAction?: () => void
}

const BackIcon = ({ customRoute, customAction }: Props) => {
  let currPath = undefined
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const route = matchRoutes(routes, location)
  if (route && route.length > 0)
    currPath = route.find((m) => m.pathname === location.pathname)?.route.path

  let to = undefined as string | undefined
  let display = true
  switch (currPath) {
    case 'create':
      display = false
      to = '/'
      break
    case ':id':
      to = '/party/my-parties'
      break
    case ':id/vote':
      to = undefined
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
    case 'privacy-policy':
      to = `/`
      break
    default:
      to = `/`
  }

  if (customRoute) to = customRoute
  if (!to) return null

  if (!display && customRoute)
    return (
      <Button onClick={() => navigate(customRoute)} sx={styles.c}>
        <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
      </Button>
    )
  if (!display && customAction) {
    return (
      <Button onClick={customAction} sx={styles.c}>
        <ArrowBackIosNewIcon sx={{ fontSize: 30 }} />
      </Button>
    )
  }
  return (
    <Button
      onClick={() => {
        dispatch(setSwipeDirection('right'))
        navigate(to ?? `/party/${id}`)
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
