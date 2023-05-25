import { CustomRestaurant, Restaurant } from './Restaurant'

export type Party = {
  _id: string
  name: string
  location: string
  max_distance: number
  number_of_restaurants: number
  max_voters: number
  times_to_vote_on: {
    id: string
    votes?: number
  }[]
  vote_on_time: boolean
  password: string
  restaurants: Restaurant[]
  r_votes: {
    [id: string]: number
  }
  t_votes: {
    [id: string]: number
  }
  r_winner: Restaurant | null
  t_winner: string | null
  createdAt: string
  updatedAt: string
  voters_so_far: number
  __v: number
  type: string
}

export type CreateParty = {
  name: string
  location: string
  email: string
  max_distance: number
  max_voters: number
  vote_on_hours: boolean
  vote_on_days: boolean
  password: string
  restaurants: (Restaurant | CustomRestaurant)[]
  type: string
  hours_to_vote_on: {
    id: string
  }[]
  days_to_vote_on: {
    id: string
  }[]
}
