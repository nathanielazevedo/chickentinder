import { configureStore } from '@reduxjs/toolkit'
import PartySlice from './state/index'

export const store = configureStore({
  reducer: PartySlice,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
