import { Swipe } from './SwipeUtils'
import { animated, useSpring } from 'react-spring'
import { Restaurant } from '../../../models/Restaurant'
import ThumbUpIcon from '@mui/icons-material/ThumbUpOffAlt'
import { useState } from 'react'

type Props = {
  index: number
  buttonsActive: boolean
  setSwipe: (swipe: Swipe) => void
  item: Restaurant | { id: string } | undefined
  items: Restaurant[] | { id: string }[] | undefined
  setIndex: React.Dispatch<React.SetStateAction<number>>
  setLikes: React.Dispatch<React.SetStateAction<string[]>>
  setButtonsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpIcon = (props: Props) => {
  const {
    item,
    setSwipe,
    setLikes,
    setIndex,
    buttonsActive,
    setButtonsActive,
  } = props
  const [state, toggle] = useState(true)

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  })
  return (
    <animated.div
      style={{
        scale: x.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
      }}
    >
      <ThumbUpIcon
        color='primary'
        sx={styles.icon}
        onClick={() => {
          if (!buttonsActive) return
          toggle(!state)
          setButtonsActive(false)
          item && setLikes((prevState) => [...prevState, item.id])
          item && setSwipe({ id: item.id, direction: 'right' })
          setTimeout(() => {
            setIndex((prevState) => prevState + 1)
            setButtonsActive(true)
          }, 1000)
        }}
      />
    </animated.div>
  )
}

export default UpIcon

const styles = {
  icon: {
    fontSize: '50px',
    cursor: 'pointer',
  },
}
