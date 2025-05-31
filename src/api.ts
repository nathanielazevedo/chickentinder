import { CreateParty, Party } from './models/Party'
import { Restaurant } from './models/Restaurant'

const localUrl = 'http://192.168.0.27:6001/'
const prodUrl = 'https://bct-production.up.railway.app/'

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const POST = { method: 'POST', headers }

export const baseUrl =
  process.env.NODE_ENV === 'production' ? prodUrl : localUrl

const getParty = async (id: string): Promise<Party> => {
  return fetch(baseUrl + 'party/' + id, { method: 'GET' })
    .then(async (res) => {
      if (res.ok) return await res.json()
      else if (res.status === 403) throw new Error('deleted')
      else throw new Error()
    })
    .catch((err: unknown) => {
      const error = err as Error
      if (error.message === 'deleted') throw new Error('deleted')
      else throw new Error()
    })
}

const createParty = async (formData: CreateParty): Promise<Party> => {
  const body = JSON.stringify(formData)
  return fetch(baseUrl, { ...POST, body })
    .then(async (res) => {
      if (!res.ok) throw new Error()
      return res.json()
    })
    .catch(() => {
      throw new Error()
    })
}

type rP = {
  location: string
  type: string
  max_distance: number
  offset?: number
}

const fetchRestaurants = async (formData: rP): Promise<Restaurant[]> => {
  const body = JSON.stringify(formData)
  return fetch(baseUrl + 'restaurants', { ...POST, body })
    .then(async (res) => {
      if (!res.status) throw new Error()
      return res.json()
    })
    .catch(() => {
      throw new Error()
    })
}

const vote = async (
  id: string,
  rLikes: string[],
  hLikes: string[] | null,
  dLikes: string[] | null
): Promise<Party> => {
  const body = JSON.stringify({ rLikes, hLikes, dLikes })
  return fetch(baseUrl + 'party/' + id + '/vote', { ...POST, body })
    .then(async (res) => {
      if (res.status !== 201) throw new Error('Error voting')
      return await res.json()
    })
    .catch((err) => {
      console.log('api 77')
      console.log(err)
    })
}

const validatePassword = async (
  id: string,
  password: string
): Promise<boolean | void> => {
  const body = JSON.stringify({ password })
  return fetch(baseUrl + 'party/' + id + '/password', { ...POST, body })
    .then((res) => {
      return res.ok
    })
    .catch((err) => {
      console.log(err)
    })
}

const endParty = async (id: string): Promise<Party> => {
  return fetch(baseUrl + 'party/' + id + '/end', { ...POST })
    .then((res) => {
      if (res.ok) return res.json()
      else return false
    })
    .catch((err) => {
      console.log(err)
    })
}

export default {
  getParty,
  vote,
  validatePassword,
  createParty,
  endParty,
  fetchRestaurants,
}
