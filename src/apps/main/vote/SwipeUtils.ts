export type Swipe = {
  id: string
  direction: string
}

const left = 'cssanimation sequence fadeOutLeft'
const right = 'cssanimation sequence fadeOutRight'

export const getSwipe = (id: string, swipe: Swipe) => {
  if (swipe?.id === id) {
    if (swipe.direction === 'left') return left
    else return right
  } else return ''
}
