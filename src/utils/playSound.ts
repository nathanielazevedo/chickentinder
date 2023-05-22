import { back, good, bad, win } from '../assets'

const playSound = (soundName: string) => {
  new AudioContext()
  let sound
  switch (soundName) {
    case 'back':
      sound = new Audio(back)
      sound.volume = 0.3
      sound.play()
      break
    case 'good':
      sound = new Audio(good)
      sound.volume = 0.4
      sound.play()
      break
    case 'bad':
      sound = new Audio(bad)
      sound.volume = 0.5
      sound.play()
      break
    case 'win':
      sound = new Audio(win)
      sound.volume = 0.5
      sound.play()
      break
  }
}

export default playSound
