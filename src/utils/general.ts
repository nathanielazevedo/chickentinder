import { Restaurant } from '../models/Restaurant'

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
