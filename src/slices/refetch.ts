import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shouldRefetchWorkouts: false,
  shouldRefetchWorkoutHistory: false,
};

export const refetchSlice = createSlice({
  name: 'refetch',
  initialState,
  reducers: {
    refetchWorkouts: (state) => {
      state.shouldRefetchWorkouts = true;
    },
    disableRefetchWorkouts: (state) => {
      state.shouldRefetchWorkouts = false;
    },
    refetchWorkoutHistory: (state) => {
      state.shouldRefetchWorkoutHistory = true;
    },
    disableRefetchWorkoutHistory: (state) => {
      state.shouldRefetchWorkoutHistory = false;
    },
  },
})

export const {
  refetchWorkouts,
  disableRefetchWorkouts,
  refetchWorkoutHistory,
  disableRefetchWorkoutHistory,
} = refetchSlice.actions

export default refetchSlice.reducer