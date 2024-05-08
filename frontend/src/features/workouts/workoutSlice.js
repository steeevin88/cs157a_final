import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutService from './workoutService'

// Get workouts
export const getWorkouts = createAsyncThunk('workouts/get', async (_, thunkAPI) => {
  try {
    return await workoutService.getWorkouts(thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Get workout by ID
export const getWorkoutById = createAsyncThunk('workouts/getById', async (id, thunkAPI) => {
  try {
    return await workoutService.getWorkoutById(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add a workout
export const addWorkout = createAsyncThunk('workouts/add', async (workoutData, thunkAPI) => {
  try {
    return await workoutService.addWorkout(workoutData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete an workout
export const deleteWorkout = createAsyncThunk('workouts/delete', async (id, thunkAPI) => {
  try {
    return await workoutService.deleteWorkout(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.workouts = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkout.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workouts.push(action.payload);
    }).addCase(addWorkout.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getWorkouts.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workouts = action.payload;
    }).addCase(getWorkouts.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getWorkoutById.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workouts = action.payload;
    }).addCase(getWorkoutById.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteWorkout.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.workouts = state.workouts.filter((workout) => workout._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteWorkout.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = workoutSlice.actions;
export default workoutSlice.reducer;
