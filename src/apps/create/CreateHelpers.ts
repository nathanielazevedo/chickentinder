import { object, string, number, boolean } from 'yup'
import { CustomRestaurant, Restaurant } from '../../models/Restaurant'

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

export const typeOptions = [
  { value: "restaurants", label: "Restaurants" },
  { value: "bars", label: "Bars" },
  { value: "cafes", label: "Cafes" },
  { value: "foodtrucks", label: "Food Trucks" },
  { value: "nightlife", label: "Nightlife" },
  { value: "bakeries", label: "Bakeries" },
  { value: "desserts", label: "Desserts" },
];

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

export const getLikedDays = (days: daysType) => {
  const likedDays = Object.keys(days).filter(
    (h) => days[h as keyof daysType] === true
  )
  return likedDays.reduce((acc, h) => {
    acc.push({ id: h })
    return acc
  }, [] as { id: string }[])
}

export const getLikedLength = (hours: hoursType) => {
  return Object.keys(hours).filter((h) => hours[h as keyof hoursType] === true)
    .length
}

export const getLikedDaysLength = (days: daysType) => {
  return Object.keys(days).filter((h) => days[h as keyof daysType] === true)
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
export type RFormType = typeof rValuesInitial
export const rValuesInitial = {
  location: '',
  type: 'restaurants',
  max_distance: 15000,
  price: '0', // or default to '1,2,3,4' to allow all
}


// Personal Form
export const personalSchema = object({
  name: string().required('Required'),
  password: string().required('Required'),
})
export type PersonalType = typeof pInitial
export const pInitial = {
  name: '',
  password: '',
}

// Voting Form
export const votersSchema = object({
  voters: boolean().required('Required'),
  max_voters: number().required('Required').positive().integer().min(2),
})
export type VotersInfo = typeof votersInitial
export const votersInitial = {
  voters: false,
  max_voters: 2,
}
