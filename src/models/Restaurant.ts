export type Restaurant = {
  id: string
  alias: string
  name: string
  image_url: string
  is_closed: boolean
  url: string
  review_count: number
  categories: {
    alias: string
    title: string
  }[]
  rating: number
  coordinates: {
    latitude: number
    longitude: number
  }
  transactions: string[]
  price: string
  location: {
    address1: string
    address2?: string | null
    address3?: string | null
    city: string
    zip_code?: string
    country?: string
    state?: string
    display_address?: string[]
  }
  phone: string
  display_phone: string
  distance: number
  checked?: boolean
}

export type CustomRestaurant = {
  id: string
  name: string
  location: {
    address1: string
  }
  checked: boolean
  url: undefined
}

export type RestaurantCreate = {
  id: string
  name: string
  location: string
  checked: boolean
  url: undefined
}
