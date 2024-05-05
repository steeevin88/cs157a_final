import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import exerciseService from './exerciseService'

// Get exercises
export const getExercises = createAsyncThunk('exercises/get', async (_, thunkAPI) => {
  try {
    return await exerciseService.getExercises(thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add an exercise
export const addExercise = createAsyncThunk('exercises/add', async (exerciseData, thunkAPI) => {
  try {
    return await exerciseService.addExercise(exerciseData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete an exercise
export const deleteExercise = createAsyncThunk('exercises/delete', async (id, thunkAPI) => {
  try {
    return await exerciseService.deleteExercise(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    exercises: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.exercises = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addExercise.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.exercises.push(action.payload);
    }).addCase(addExercise.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getExercises.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.exercises = action.payload;
    }).addCase(getExercises.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteExercise.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.exercises = state.exercises.filter((exercise) => exercise._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteExercise.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = exerciseSlice.actions;
export default exerciseSlice.reducer;
