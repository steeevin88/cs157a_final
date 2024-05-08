import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import motivationMessageService from './motivationMessageService'

// Get motivation wall's messages
export const getMessages = createAsyncThunk('messages/get', async (id, thunkAPI) => {
  try {
    return await motivationMessageService.getMessages(id, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Add a message
export const addMessage = createAsyncThunk('messages/add', async (messageData, thunkAPI) => {
  try {
    return await motivationMessageService.addMessage(messageData, thunkAPI.getState().auth.user.token);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const motivationMessageSlice = createSlice({
  name: 'motivation_message',
  initialState: {
    motivation_messages: [],
    error: false,
    fulfilled: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.motivation_messages = [];
      state.error = false;
      state.fulfilled = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_messages.push(action.payload);
    }).addCase(addMessage.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    }).addCase(getMessages.fulfilled, (state, action) => {
      state.fulfilled = true;
      state.motivation_messages = action.payload;
    }).addCase(getMessages.rejected, (state, action) => {
      state.fulfilled = false;
      state.error = true;
      state.message = action.payload;
    })
  }
});


export const { reset } = motivationMessageSlice.actions;
export default motivationMessageSlice.reducer;
