import { Swipe } from './SwipeUtils'
import { animated, useSpring } from 'react-spring'
import { Restaurant } from '../../../models/Restaurant'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { useState } from 'react'

type Props = {
  index: number
  buttonsActive: boolean
  setSwipe: (swipe: Swipe) => void
  item: Restaurant | { id: string }
  items: Restaurant[] | { id: string }[]
  setIndex: React.Dispatch<React.SetStateAction<number>>
  setLikes: React.Dispatch<React.SetStateAction<string[]>>
  setButtonsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpIcon = (props: Props) => {
  const {
    index,
    setSwipe,
    setLikes,
    setIndex,
    buttonsActive,
    setButtonsActive,
    items,
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
      <SettingsBackupRestoreIcon
        color='warning'
        sx={styles.icon}
        onClick={() => {
          if (!buttonsActive) return
          toggle(!state)
          setButtonsActive(false)
          setSwipe({ id: '123', direction: 'left' })
          setLikes((prevState) => [
            ...prevState.filter((id) => id != items[index - 1].id),
          ])
          setIndex((prevState) => prevState - 1)
          setButtonsActive(true)
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
