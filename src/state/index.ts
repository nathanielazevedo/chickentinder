/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '../api'
import { Party } from '../models/Party'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  party: undefined as Party | undefined | null,
  swipeDirection: 'left' as 'none' | 'left' | 'right',
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
      state.swipeDirection = action.payload
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

export const { setRParty, setSwipeDirection } = partySlice.actions
export default partySlice.reducer
