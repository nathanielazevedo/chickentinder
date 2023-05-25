import { object, string, number } from 'yup'
import { CustomRestaurant, Restaurant } from '../../../models/Restaurant'

export const noRMessage = 'No restaurants found. Please try again.'
export type hoursType = typeof hoursInitial
export type valueType = typeof valueInitial

export const hoursInitial = {
  '7-8 AM': false,
  '8-9 AM': false,
  '9-10 AM': false,
  '10-11 AM': false,
  '11-12 PM': false,
  '12-1 PM': false,
  '1-2 PM': false,
  '2-3 PM': false,
  '3-4 PM': false,
  '4-5 PM': false,
  '5-6 PM': false,
  '6-7 PM': false,
  '7-8 PM': false,
  '8-9 PM': false,
  '9-10 PM': false,
  '10-11 PM': false,
  '11-12 AM': false,
}

export const valueInitial = {
  name: '',
  location: '',
  password: '',
  type: 'restaurants',
  max_voters: 5,
  max_distance: 15000,
  number_of_restaurants: 5,
}

export const rvaluesInitial = {
  id: '',
  name: '',
  location: '',
  checked: true,
  url: undefined,
}

export const partySchema = object({
  name: string().required('Required'),
  location: string().required('Required'),
  max_distance: number()
    .required('Required')
    .positive()
    .integer('Must be an integer'),
  max_voters: number().required('Required').positive().integer().min(2),
  password: string().required('Required'),
  type: string().required('Required'),
  number_of_restaurants: number()
    .required('Required')
    .positive()
    .integer()
    .min(2),
})

export const restaurantSchema = object({
  name: string().required('Required'),
  location: string().required('Required'),
})

export const contactSchema = object({
  name: string().required('Required'),
  email: string().email().required('Required'),
  message: string().required('Required'),
})

export const toMeters = (miles: number) => {
  const meters = miles * 1609.34
  return Math.round(meters)
}

export const toMiles = (km: number) => {
  const miles = km / 1609.34
  return Math.round(miles)
}

export const getLikedHours = (hours: hoursType) => {
  const likedHours = Object.keys(hours).filter(
    (h) => hours[h as keyof hoursType] === true
  )
  return likedHours.reduce((acc, h) => {
    acc.push({ id: h })
    return acc
  }, [] as { id: string }[])
}

export const getLikedLength = (hours: hoursType) => {
  return Object.keys(hours).filter((h) => hours[h as keyof hoursType] === true)
    .length
}

export const addChecks = (restaurants: Restaurant[]) => {
  return restaurants.map((r: Restaurant) => {
    return { ...r, checked: true }
  })
}

export const getCheckedRestaurants = (
  restaurants: (Restaurant | CustomRestaurant)[]
) => {
  return restaurants.filter((r) => r.checked === true)
}
