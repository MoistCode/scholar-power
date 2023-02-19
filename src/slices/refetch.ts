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
    refetchUserWorkout: (state) => {
      state.shouldRefetchUserWorkout = true;
    },
    disableRefetchWorkouts: (state) => {
      state.shouldRefetchWorkouts = false;
    },
    disableRefetchUserWorkout: (state) => {
      state.shouldRefetchUserWorkout = false;
    },
  },
})

export const {
  refetchWorkouts,
  refetchUserWorkout,
  disableRefetchWorkouts,
  disableRefetchUserWorkout,
} = refetchSlice.actions

export default refetchSlice.reducer