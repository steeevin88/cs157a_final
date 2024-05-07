import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

// Get goals
export const getGoals = createAsyncThunk('goals/get', async (_, thunkAPI) => {
  try {
    return await goalService.getGoals(thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})


// Add an goal
export const addGoal = createAsyncThunk('goals/add', async (goalData, thunkAPI) => {
  try {
    return await goalService.addGoal(goalData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete a goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    return await goalService.deleteGoal(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    goals: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.goals = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addGoal.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.goals.push(action.payload);
    }).addCase(addGoal.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getGoals.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.goals = action.payload;
    }).addCase(getGoals.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteGoal.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteGoal.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
