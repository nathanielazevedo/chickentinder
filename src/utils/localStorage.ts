export type PreLocalParty = {
  _id: string
  name: string
  voted: boolean
}

export type LocalParty = {
  _id: string
  name: string
  voted: boolean
  voteRestaurants: string[]
  voteTime: string[]
  likedDays: string[]
}

export const haveLocalParties = () => {
  return localStorage.getItem('parties') !== null
}

export const getPartiesFromLocal = (): LocalParty[] | null => {
  const parties = localStorage.getItem('parties')
  return parties ? JSON.parse(parties) : null
}

export const getPartyFromLocal = (id: string) => {
  const parties = getPartiesFromLocal()
  return parties ? parties.find((party: LocalParty) => party._id === id) : null
}

export const addPartyToLocal = (preParty: PreLocalParty) => {
  const party = {
    ...preParty,
    voteRestaurants: [],
    voteTimes: [],
  }
  const parties = getPartiesFromLocal()
  if (parties) {
    localStorage.setItem('parties', JSON.stringify([...parties, party]))
  } else {
    localStorage.setItem('parties', JSON.stringify([party]))
  }
}

export const updatePartyInLocal = (party: LocalParty) => {
  const parties = getPartiesFromLocal()
  if (parties) {
    localStorage.setItem(
      'parties',
      JSON.stringify(
        parties.map((p: LocalParty) => (p._id === party._id ? party : p))
      )
    )
  }
}

export const removePartyFromLocal = (id: string) => {
  console.log('removePartyFromLocal')
  const parties = getPartiesFromLocal()
  if (parties) {
    localStorage.setItem(
      'parties',
      JSON.stringify(parties.filter((party: LocalParty) => party._id !== id))
    )
  }
}
