import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutExerciseService from './workoutExerciseService';

// Get workout exercises
export const getWorkoutExercises = createAsyncThunk('workouts_exercises/get', async (id, thunkAPI) => {
  try {
    return await workoutExerciseService.getWorkoutExercises(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add an exercise to a workout
export const addWorkoutExercise = createAsyncThunk('workouts_exercises/add', async (workoutData, thunkAPI) => {
  try {
    return await workoutExerciseService.addWorkoutExercise(workoutData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete an exercise from a workout
export const deleteWorkoutExercise = createAsyncThunk('workouts_exercises/delete', async (workoutData, thunkAPI) => {
  try {
    return await workoutExerciseService.deleteWorkoutExercise(workoutData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const workoutExerciseSlice = createSlice({
  name: 'workout_exercises',
  initialState: {
    workout_exercises: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.workout_exercises = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkoutExercise.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workout_exercises.push(action.payload);
    }).addCase(addWorkoutExercise.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getWorkoutExercises.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workout_exercises = action.payload;
    }).addCase(getWorkoutExercises.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteWorkoutExercise.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workout_exercises = state.workout_exercises.filter((workout_exercise) => workout_exercise._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteWorkoutExercise.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = workoutExerciseSlice.actions;
export default workoutExerciseSlice.reducer;
