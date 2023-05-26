import { party } from './mockData/mockP'
import { restaurantsNoChecks } from './mockData/mockR'
import { CreateParty, Party } from './models/Party'
import { Restaurant } from './models/Restaurant'

const localUrl = 'http://localhost:6001/'
const prodUrl = 'https://shy-red-boa-suit.cyclic.app/'
const mock = process.env.NODE_ENV === 'production' ? false : false
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const POST = { method: 'POST', headers }

export const baseUrl =
  process.env.NODE_ENV === 'production' ? prodUrl : localUrl

const getParty = async (id: string): Promise<Party> => {
  if (mock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(party)
      }, 2000)
    })
  } else {
    return fetch(baseUrl + 'party/' + id, { method: 'GET' })
      .then(async (res) => {
        if (res.ok) return await res.json().then((data) => data)
        else if (res.status === 403) throw new Error('deleted')
        else throw new Error()
      })
      .catch(() => {
        throw new Error()
      })
  }
}

const createParty = async (formData: CreateParty): Promise<Party> => {
  if (mock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(party)
      }, 2000)
    })
  } else {
    const body = JSON.stringify(formData)
    return fetch(baseUrl, { ...POST, body })
      .then(async (res) => {
        if (!res.ok) throw new Error()
        return res.json().then((party) => party)
      })
      .catch(() => {
        throw new Error()
      })
  }
}

type rP = {
  location: string
  type: string
  max_distance: number
  // number_of_restaurants: number
}

const fetchRestaurants = async (formData: rP): Promise<Restaurant[]> => {
  if (mock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(restaurantsNoChecks)
      }, 1000)
    })
  } else {
    const body = JSON.stringify(formData)
    return fetch(baseUrl + 'restaurants', { ...POST, body })
      .then(async (res) => {
        if (!res.status) throw new Error()
        return res.json().then((data) => data)
      })
      .catch(() => {
        throw new Error()
      })
  }
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
      return await res.json().then((party) => party)
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
  if (mock) return true
  const body = JSON.stringify({ password })
  return fetch(baseUrl + 'party/' + id + '/password', { ...POST, body })
    .then((res) => {
      if (res.ok) return true
      else return false
    })
    .catch((err) => {
      console.log(err)
    })
}

const endParty = async (id: string): Promise<Party> => {
  return fetch(baseUrl + 'party/' + id + '/end', { ...POST })
    .then((res) => {
      if (res.ok) return res.json().then((party) => party)
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
