import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recordService from './recordService'

// Get records
export const getRecords = createAsyncThunk('records/get', async (id, thunkAPI) => {
  try {
    return await recordService.getRecords(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add an record
export const addRecord = createAsyncThunk('records/add', async (recordData, thunkAPI) => {
  try {
    return await recordService.addRecord(recordData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Delete an record
export const deleteRecord = createAsyncThunk('records/delete', async (id, thunkAPI) => {
  try {
    return await recordService.deleteRecord(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const recordSlice = createSlice({
  name: 'record',
  initialState: {
    records: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.records = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addRecord.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.records.push(action.payload);
    }).addCase(addRecord.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getRecords.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.records = action.payload;
    }).addCase(getRecords.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(deleteRecord.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.records = state.records.filter((record) => record._id !== action.payload.id);
      state.message = action.payload
    }).addCase(deleteRecord.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = recordSlice.actions;
export default recordSlice.reducer;
