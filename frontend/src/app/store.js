import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exerciseReducer from '../features/exercises/exerciseSlice';
import recordReducer from '../features/records/recordSlice';
import goalReducer from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    records: recordReducer,
    goals: goalReducer,
  },
});
