import { useAppSelector } from '../state/redux'
import { useSpring, animated } from '@react-spring/web'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SlideIn = ({ children }: any) => {
  const dir = useAppSelector((state) => state.swipeDirection)

  const props = useSpring({
    from:
      dir === 'left'
        ? { opacity: 0, transform: 'translate3d(40%,0%,0)' }
        : { opacity: 0, transform: 'translate3d(-40%,0%,0)' },
    to: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  })

  return <animated.div style={props}>{children}</animated.div>
}

export default SlideIn
