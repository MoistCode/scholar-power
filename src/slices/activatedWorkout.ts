import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: InitialState = {
  hasActivatedWorkout: false,
  activatedWorkoutId: '',
  timer: null,
};

export const activatedWorkoutSlice = createSlice({
  name: 'activateWorkout',
  initialState,
  reducers: {
    startWorkout: (state, action: PayloadAction<string>) => {
      state.timer = new Date().getTime();
      state.hasActivatedWorkout = true;
      state.activatedWorkoutId = action.payload;
    },
    endWorkout: (state) => {
      state.timer = null;
      state.hasActivatedWorkout = false;
      state.activatedWorkoutId = '';
    },
  },
})

export const {
  startWorkout,
  endWorkout,
} = activatedWorkoutSlice.actions

export default activatedWorkoutSlice.reducer

type InitialState = {
  hasActivatedWorkout: boolean;
  activatedWorkoutId: string;
  timer: number | null;
}