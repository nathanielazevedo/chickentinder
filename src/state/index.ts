/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Party } from '../models/Party'
import API from '../api'

const initialState = {
  party: undefined as Party | undefined | null,
  nav: {
    swipeDirection: 'left' as 'none' | 'left' | 'right',
    to: '/' as string | (() => void),
  },
}

export type PartySlice = typeof initialState

export const fetchParty = createAsyncThunk(
  'party/fetchById',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (id: string, _thunkAPI: any) => {
    const response = await API.getParty(id)
    return response
  }
)
export const endParty = createAsyncThunk(
  'party/endById',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (id: string, _thunkAPI: any) => {
    const response = await API.endParty(id)
    return response
  }
)

export const partySlice = createSlice({
  name: 'chicken',
  initialState,
  reducers: {
    setRParty: (state, action) => {
      state.party = action.payload
    },
    setSwipeDirection: (state, action) => {
      state.nav.swipeDirection = action.payload
    },
    setSwipeTo: (state, action) => {
      state.nav.to = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParty.fulfilled, (state, action) => {
      state.party = action.payload
    })
    builder.addCase(fetchParty.rejected, (state) => {
      state.party = null
    })
    builder.addCase(endParty.fulfilled, (state, action) => {
      state.party = action.payload
    })
  },
})

export const { setRParty, setSwipeDirection, setSwipeTo } = partySlice.actions
export default partySlice.reducer
