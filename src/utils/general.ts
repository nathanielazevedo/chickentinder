import { Restaurant } from '../models/Restaurant'
import {
  small_0,
  small_1,
  small_1_half,
  small_2,
  small_2_half,
  small_3,
  small_3_half,
  small_4,
  small_4_half,
  small_5,
} from '../assets/yelp'

const localUrl = 'http://localhost:5173/'
const prodUrl = 'https://www.thechickentinder.com/'

export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? localUrl : prodUrl
}

export const toMiles = (km: number) => {
  const miles = km / 1609.34
  return Math.floor(miles)
}

type Vote = {
  [time: string]: number
}

export const addVotesTo = (
  items:
    | Restaurant[]
    | {
        id: string
        votes?: number | undefined
      }[],
  votes: Vote
) => {
  items.forEach((item) => {
    if (votes[item.id]) item.votes = votes[item.id]
    else item.votes = 0
  })
  items.sort((a, b) => {
    if (!a.votes) a.votes = 0
    if (!b.votes) b.votes = 0
    return b.votes - a.votes
  })
}

export const getStarsImage = (rating: number) => {
  switch (rating) {
    case 0:
      return small_0
    case 1:
      return small_1
    case 1.5:
      return small_1_half
    case 2:
      return small_2
    case 2.5:
      return small_2_half
    case 3:
      return small_3
    case 3.5:
      return small_3_half
    case 4:
      return small_4
    case 4.5:
      return small_4_half
    case 5:
      return small_5
    default:
      return small_0
  }
}
