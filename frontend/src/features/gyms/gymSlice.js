import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gymService from './gymService'

// Get gyms
export const getGyms = createAsyncThunk('gyms/get', async (_, thunkAPI) => {
  try {
    return await gymService.getGyms(thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})


// Add a gym
export const addGym = createAsyncThunk('gyms/add', async (gymData, thunkAPI) => {
  try {
    return await gymService.addGym(gymData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete a gym
export const deleteGym = createAsyncThunk('gyms/delete', async (id, thunkAPI) => {
  try {
    return await gymService.deleteGym(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const gymSlice = createSlice({
  name: 'gym',
  initialState: {
    gyms: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.gyms = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addGym.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.gyms.push(action.payload);
    }).addCase(addGym.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getGyms.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.gyms = action.payload;
    }).addCase(getGyms.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteGym.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.gyms = state.gyms.filter((gym) => gym._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteGym.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = gymSlice.actions;
export default gymSlice.reducer;
