import { describe, it, expect } from 'vitest'
import { mockH, rChecks, rNoChecks } from './mocks'

// To Test
import {
  toMeters,
  toMiles,
  getLikedHours,
  getLikedLength,
  addChecks,
  getCheckedRestaurants,
} from '../apps/create/CreateHelpers'

describe('Create Helpers', async () => {
  it('toMeters', async () => {
    expect(toMeters(1)).toBe(1609)
  })
  it('toMiles', async () => {
    expect(toMiles(1609)).toBe(1)
  })
  it('getLikedHours', async () => {
    expect(getLikedHours(mockH)).toEqual([
      { id: '1-2 PM' },
      { id: '5-6 PM' },
      { id: '6-7 PM' },
    ])
  })
  it('getLikedLength', async () => {
    expect(getLikedLength(mockH)).toBe(3)
  })

  it('addChecks', async () => {
    expect(addChecks(rNoChecks)).toEqual(rChecks)
  })
  it('getCheckedRestaurants', async () => {
    rChecks[0].checked = false
    expect(getCheckedRestaurants(rChecks)).toEqual([rChecks[1]])
  })
})
