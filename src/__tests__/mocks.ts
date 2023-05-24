import { Restaurant } from '../models/Restaurant'

export const mockH = {
  '7-8 AM': false,
  '8-9 AM': false,
  '9-10 AM': false,
  '10-11 AM': false,
  '11-12 PM': false,
  '12-1 PM': false,
  '1-2 PM': true,
  '2-3 PM': false,
  '3-4 PM': false,
  '4-5 PM': false,
  '5-6 PM': true,
  '6-7 PM': true,
  '7-8 PM': false,
  '8-9 PM': false,
  '9-10 PM': false,
  '10-11 PM': false,
  '11-12 AM': false,
}

export const rNoChecks = [
  {
    id: 'MJEwQTtY9mzWJLCU7e25bw',
    alias: 'draft-republic-san-marcos-san-marcos-2',
    name: 'Draft Republic - San Marcos',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/I04V2yKBIZa43hdeGa9DYg/o.jpg',
    is_closed: false,
    url: 'https://www.yelp.com/biz/draft-republic-san-marcos-san-marcos-2?adjust_creative=VintRRO4PepUJuYaCM8drQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=VintRRO4PepUJuYaCM8drQ',
    review_count: 316,
    categories: [
      {
        alias: 'beergardens',
        title: 'Beer Gardens',
      },
      {
        alias: 'tradamerican',
        title: 'American (Traditional)',
      },
      {
        alias: 'gastropubs',
        title: 'Gastropubs',
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 33.1359,
      longitude: -117.15821,
    },
    transactions: [],
    price: '$$',
    location: {
      address1: '255 Redel Rd',
      address2: null,
      address3: null,
      city: 'San Marcos',
      zip_code: '92078',
      country: 'US',
      state: 'CA',
      display_address: ['255 Redel Rd', 'San Marcos, CA 92078'],
    },
    phone: '+17602903520',
    display_phone: '(760) 290-3520',
    distance: 1853.7821535245944,
    checked: true,
  },
  {
    id: '3rqvZnEUbGIuCKHsBWLFLg',
    alias: 'amalfi-cucina-italiana-san-marcos-2',
    name: 'Amalfi Cucina Italiana',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/Zwx1mgr9gEc_oIpFG2EfpQ/o.jpg',
    is_closed: false,
    url: 'https://www.yelp.com/biz/amalfi-cucina-italiana-san-marcos-2?adjust_creative=VintRRO4PepUJuYaCM8drQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=VintRRO4PepUJuYaCM8drQ',
    review_count: 643,
    categories: [
      {
        alias: 'italian',
        title: 'Italian',
      },
      {
        alias: 'pizza',
        title: 'Pizza',
      },
      {
        alias: 'bars',
        title: 'Bars',
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 33.12392496202204,
      longitude: -117.20782744781258,
    },
    transactions: ['pickup', 'delivery'],
    price: '$$',
    location: {
      address1: '1035 La Bonita Dr',
      address2: null,
      address3: null,
      city: 'San Marcos',
      zip_code: '92078',
      country: 'US',
      state: 'CA',
      display_address: ['1035 La Bonita Dr', 'San Marcos, CA 92078'],
    },
    phone: '+17606533230',
    display_phone: '(760) 653-3230',
    distance: 3235.8926326354317,
  },
] as Restaurant[]

export const rChecks = [
  {
    id: 'MJEwQTtY9mzWJLCU7e25bw',
    alias: 'draft-republic-san-marcos-san-marcos-2',
    name: 'Draft Republic - San Marcos',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/I04V2yKBIZa43hdeGa9DYg/o.jpg',
    is_closed: false,
    url: 'https://www.yelp.com/biz/draft-republic-san-marcos-san-marcos-2?adjust_creative=VintRRO4PepUJuYaCM8drQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=VintRRO4PepUJuYaCM8drQ',
    review_count: 316,
    categories: [
      {
        alias: 'beergardens',
        title: 'Beer Gardens',
      },
      {
        alias: 'tradamerican',
        title: 'American (Traditional)',
      },
      {
        alias: 'gastropubs',
        title: 'Gastropubs',
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 33.1359,
      longitude: -117.15821,
    },
    transactions: [],
    price: '$$',
    location: {
      address1: '255 Redel Rd',
      address2: null,
      address3: null,
      city: 'San Marcos',
      zip_code: '92078',
      country: 'US',
      state: 'CA',
      display_address: ['255 Redel Rd', 'San Marcos, CA 92078'],
    },
    phone: '+17602903520',
    display_phone: '(760) 290-3520',
    distance: 1853.7821535245944,
    checked: true,
  },
  {
    id: '3rqvZnEUbGIuCKHsBWLFLg',
    alias: 'amalfi-cucina-italiana-san-marcos-2',
    name: 'Amalfi Cucina Italiana',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/Zwx1mgr9gEc_oIpFG2EfpQ/o.jpg',
    is_closed: false,
    url: 'https://www.yelp.com/biz/amalfi-cucina-italiana-san-marcos-2?adjust_creative=VintRRO4PepUJuYaCM8drQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=VintRRO4PepUJuYaCM8drQ',
    review_count: 643,
    categories: [
      {
        alias: 'italian',
        title: 'Italian',
      },
      {
        alias: 'pizza',
        title: 'Pizza',
      },
      {
        alias: 'bars',
        title: 'Bars',
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 33.12392496202204,
      longitude: -117.20782744781258,
    },
    transactions: ['pickup', 'delivery'],
    price: '$$',
    location: {
      address1: '1035 La Bonita Dr',
      address2: null,
      address3: null,
      city: 'San Marcos',
      zip_code: '92078',
      country: 'US',
      state: 'CA',
      display_address: ['1035 La Bonita Dr', 'San Marcos, CA 92078'],
    },
    phone: '+17606533230',
    display_phone: '(760) 653-3230',
    distance: 3235.8926326354317,
    checked: true,
  },
] as Restaurant[]
