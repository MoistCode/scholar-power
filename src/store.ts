import { configureStore } from '@reduxjs/toolkit'

import refetchReducer from './slices/refetch';

export const store = configureStore({
  reducer: {
    refetch: refetchReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch