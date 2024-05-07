import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import motivationWallService from './motivationWallService'

// Get motivation walls
export const getMotivationWalls = createAsyncThunk('motivation_walls/get', async (_, thunkAPI) => {
  try {
    return await motivationWallService.getMotivationWalls(thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Get exercise by ID
export const getMotivationWallById = createAsyncThunk('motivation_walls/getById', async (id, thunkAPI) => {
  try {
    return await motivationWallService.getMotivationWallById(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add an exercise
export const addMotivationWall = createAsyncThunk('motivation_walls/add', async (exerciseData, thunkAPI) => {
  try {
    return await motivationWallService.addMotivationWall(exerciseData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete an exercise
export const deleteMotivationWall = createAsyncThunk('motivation_walls/delete', async (id, thunkAPI) => {
  try {
    return await motivationWallService.deleteMotivationWall(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const motivationWallSlice = createSlice({
  name: 'motivation_wall',
  initialState: {
    motivation_walls: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.motivation_walls = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addMotivationWall.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_walls.push(action.payload);
    }).addCase(addMotivationWall.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getMotivationWalls.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_walls = action.payload;
    }).addCase(getMotivationWalls.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getMotivationWallById.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_walls = action.payload;
    }).addCase(getMotivationWallById.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteMotivationWall.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_walls = state.motivation_walls.filter((motivation_wall) => motivation_wall._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteMotivationWall.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = motivationWallSlice.actions;
export default motivationWallSlice.reducer;
