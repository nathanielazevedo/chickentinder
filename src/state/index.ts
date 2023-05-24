/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Party } from '../models/Party'
import API from '../api'

const initialState = {
  party: undefined as Party | undefined | null,
}

export type PartySlice = typeof initialState

// First, create the thunk
export const fetchParty = createAsyncThunk(
  'party/fetchById',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (id: string, _thunkAPI: any) => {
    const response = await API.getParty(id)
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParty.fulfilled, (state, action) => {
      state.party = action.payload
    })
    builder.addCase(fetchParty.rejected, (state) => {
      state.party = null
    })
  },
})

export const { setRParty } = partySlice.actions
export default partySlice.reducer
