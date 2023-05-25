import { object, string, number } from 'yup'
import { CustomRestaurant, Restaurant } from '../../../models/Restaurant'

export const noRMessage = 'No restaurants found. Please try again.'
export type hoursType = typeof hoursInitial

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

export type daysType = typeof daysInitial
export const daysInitial = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false,
}

export const rvaluesInitial = {
  id: '',
  name: '',
  location: '',
  checked: true,
  url: undefined,
}

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

// Restaurant Form
export const rFormSchema = object({
  location: string().required('Required'),
  max_distance: number()
    .required('Required')
    .positive()
    .integer('Must be an integer'),
  type: string().required('Required'),
})

export type rInitial = typeof rValuesInitial
export const rValuesInitial = {
  location: '',
  type: 'restaurants',
  max_distance: 15000,
}

// Personal Form
export const personalSchema = object({
  name: string().required('Required'),
  email: string().email().required('Required'),
  password: string().required('Required'),
})

export type pInitial = typeof pInitial
export const pInitial = {
  name: '',
  email: '',
  password: '',
}

// Voting Form
export const votersSchema = object({
  voters: string().required('Required'),
  votersNumber: number().required('Required').positive().integer().min(2),
})

export type votersInitial = typeof votersInitial
export const votersInitial = {
  voters: false,
  votersNumber: 0,
}
