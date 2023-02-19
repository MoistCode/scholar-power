import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shouldRefetchWorkouts: false,
  shouldRefetchUserWorkout: false,
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
  },
})

export const {
  refetchWorkouts,
  disableRefetchWorkouts,
} = refetchSlice.actions

export default refetchSlice.reducer